const STATUS_CODES = exports.STATUS_CODES = {
    100 : 'Continue',
    101 : 'Switching Protocols',
    102 : 'Processing',                 // RFC 2518, obsoleted by RFC 4918
    200 : 'OK',
    201 : 'Created',
    202 : 'Accepted',
    203 : 'Non-Authoritative Information',
    204 : 'No Content',
    205 : 'Reset Content',
    206 : 'Partial Content',
    207 : 'Multi-Status',               // RFC 4918
    208 : 'Already Reported',
    226 : 'IM Used',
    300 : 'Multiple Choices',
    301 : 'Moved Permanently',
    302 : 'Found',
    303 : 'See Other',
    304 : 'Not Modified',
    305 : 'Use Proxy',
    307 : 'Temporary Redirect',
    308 : 'Permanent Redirect',         // RFC 7238
    400 : 'Bad Request',
    401 : 'Unauthorized',
    402 : 'Payment Required',
    403 : 'Forbidden',
    404 : 'Not Found',
    405 : 'Method Not Allowed',
    406 : 'Not Acceptable',
    407 : 'Proxy Authentication Required',
    408 : 'Request Timeout',
    409 : 'Conflict',
    410 : 'Gone',
    411 : 'Length Required',
    412 : 'Precondition Failed',
    413 : 'Payload Too Large',
    414 : 'URI Too Long',
    415 : 'Unsupported Media Type',
    416 : 'Range Not Satisfiable',
    417 : 'Expectation Failed',
    418 : 'I\'m a teapot',              // RFC 2324
    421 : 'Misdirected Request',
    422 : 'Unprocessable Entity',       // RFC 4918
    423 : 'Locked',                     // RFC 4918
    424 : 'Failed Dependency',          // RFC 4918
    425 : 'Unordered Collection',       // RFC 4918
    426 : 'Upgrade Required',           // RFC 2817
    428 : 'Precondition Required',      // RFC 6585
    429 : 'Too Many Requests',          // RFC 6585
    431 : 'Request Header Fields Too Large', // RFC 6585
    451 : 'Unavailable For Legal Reasons',
    500 : 'Internal Server Error',
    501 : 'Not Implemented',
    502 : 'Bad Gateway',
    503 : 'Service Unavailable',
    504 : 'Gateway Timeout',
    505 : 'HTTP Version Not Supported',
    506 : 'Variant Also Negotiates',    // RFC 2295
    507 : 'Insufficient Storage',       // RFC 4918
    508 : 'Loop Detected',
    509 : 'Bandwidth Limit Exceeded',
    510 : 'Not Extended',               // RFC 2774
    511 : 'Network Authentication Required' // RFC 6585
};

const kOnExecute = HTTPParser.kOnExecute | 0;


function ServerResponse(req) {
    OutgoingMessage.call(this);                                      //调用输出流

    if (req.method === 'HEAD') this._hasBody = false;                //如果请求方法是head,没有请求体

    this.sendDate = true;                                            //发送日期

    if (req.httpVersionMajor < 1 || req.httpVersionMinor < 1) {      //如果http版本小于1
        this.useChunkedEncodingByDefault = chunkExpression.test(req.headers.te);  //按块发送
        this.shouldKeepAlive = false;                                //关闭长连接
    }
}
util.inherits(ServerResponse, OutgoingMessage);

ServerResponse.prototype._finish = function() {
    DTRACE_HTTP_SERVER_RESPONSE(this.connection);
    LTTNG_HTTP_SERVER_RESPONSE(this.connection);
    COUNTER_HTTP_SERVER_RESPONSE();
    OutgoingMessage.prototype._finish.call(this);
};


exports.ServerResponse = ServerResponse;

ServerResponse.prototype.statusCode = 200;                           //默认返回200
ServerResponse.prototype.statusMessage = undefined;                  //默认原因,null

//发送close
function onServerResponseClose() {
    // EventEmitter.emit makes a copy of the 'close' listeners array before
    // calling the listeners. detachSocket() unregisters onServerResponseClose
    // but if detachSocket() is called, directly or indirectly, by a 'close'
    // listener, onServerResponseClose is still in that copy of the listeners
    // array. That is, in the example below, b still gets called even though
    // it's been removed by a:
    //
    //   var EventEmitter = require('events');
    //   var obj = new EventEmitter();
    //   obj.on('event', a);
    //   obj.on('event', b);
    //   function a() { obj.removeListener('event', b) }
    //   function b() { throw "BAM!" }
    //   obj.emit('event');  // throws
    //
    // Ergo, we need to deal with stale 'close' events and handle the case
    // where the ServerResponse object has already been deconstructed.
    // Fortunately, that requires only a single if check. :-)
    if (this._httpMessage) this._httpMessage.emit('close');           //response对象发送关闭事件
}

ServerResponse.prototype.assignSocket = function(socket) {            //分配socket,连接http时调用
    assert(!socket._httpMessage);
    socket._httpMessage = this;                                       //socket对象的_httpMessage等于response对象
    socket.on('close', onServerResponseClose);                        //socket关闭时关闭response
    this.socket = socket;                                             //
    this.connection = socket;
    this.emit('socket', socket);                                      //触发socket事件
    this._flush();                                                    //发送socket缓存区
};

ServerResponse.prototype.detachSocket = function(socket) {            //卸载socket,res finish调用
    assert(socket._httpMessage === this);
    socket.removeListener('close', onServerResponseClose);
    socket._httpMessage = null;
    this.socket = this.connection = null;
};

ServerResponse.prototype.writeContinue = function(cb) {               //写100continue
    this._writeRaw('HTTP/1.1 100 Continue' + CRLF + CRLF, 'ascii', cb);
    this._sent100 = true;
};

ServerResponse.prototype._implicitHeader = function() {                //写状态码
    this.writeHead(this.statusCode);
};

ServerResponse.prototype.writeHead = function(statusCode, reason, obj) {
    var headers;

    if (typeof reason === 'string') {
        // writeHead(statusCode, reasonPhrase[, headers])
        this.statusMessage = reason;
    } else {                                    //如果没有显式传递reason,从STATUS_CODES读取返回信息
        // writeHead(statusCode[, headers])
        this.statusMessage =
            this.statusMessage || STATUS_CODES[statusCode] || 'unknown';
        obj = reason;
    }
    this.statusCode = statusCode;                 //赋值状态码

    if (this._headers) {
        // Slow-case: when progressive API and header fields are passed.
        if (obj) {
            var keys = Object.keys(obj);
            for (var i = 0; i < keys.length; i++) {
                var k = keys[i];
                if (k) this.setHeader(k, obj[k]); //写入_header
            }
        }
        // only progressive api is used
        headers = this._renderHeaders();       //读取header
    } else {
        // only writeHead() called
        headers = obj;
    }

    statusCode |= 0;
    if (statusCode < 100 || statusCode > 999)
        throw new RangeError(`Invalid status code: ${statusCode}`);

    var statusLine = 'HTTP/1.1 ' + statusCode.toString() + ' ' +
        this.statusMessage + CRLF;

    //如果204,304,或者在100~200之间,没有返回体
    if (statusCode === 204 || statusCode === 304 ||
        (100 <= statusCode && statusCode <= 199)) {
        // RFC 2616, 10.2.5:
        // The 204 response MUST NOT include a message-body, and thus is always
        // terminated by the first empty line after the header fields.
        // RFC 2616, 10.3.5:
        // The 304 response MUST NOT contain a message-body, and thus is always
        // terminated by the first empty line after the header fields.
        // RFC 2616, 10.1 Informational 1xx:
        // This class of status code indicates a provisional response,
        // consisting only of the Status-Line and optional headers, and is
        // terminated by an empty line.
        this._hasBody = false;
    }

    // don't keep alive connections where the client expects 100 Continue
    // but we sent a final status; they may put extra bytes on the wire.
    if (this._expect_continue && !this._sent100) {     //如果是100 continue,关闭长连接
        this.shouldKeepAlive = false;
    }

    //存储header,写入响应报文头
    this._storeHeader(statusLine, headers);
};

ServerResponse.prototype.writeHeader = function() {                 //写响应头
    this.writeHead.apply(this, arguments);
};
