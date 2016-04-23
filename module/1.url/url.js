var url=require('url') ;

//输入 URL 字符串，返回一个对象。
//第二个参数为 true 时，使用 querystring 来解析查询字符串。如果为 true，query 属性将会一直赋值为对象，并且 search 属性将会一直是字符串(可能为空)。默认为 false。
//第三个参数为true ，把 //foo/bar 当做{ host: 'foo', pathname: '/bar' } ，而不是{ pathname: '//foo/bar' }。默认为 false。
console.log(url.parse('http://www.imooc.com:8080/course/list?c=angularjs#floor1'));
console.log(url.parse('schema://www.imooc.com:8080/course/list?c=angularjs#floor1',true));
console.log(url.parse('//www.imooc.com:8080/course/list?c=angularjs#floor1',true,true));

//输入一个解析过的 URL 对象，返回格式化过的字符串。
//href 会被忽略
//protocol 无论是否有末尾的 : (冒号)，会同样的处理
//http, https, ftp, gopher, file 协议会被添加后缀://
//    mailto, xmpp, aim, sftp, foo, 等协议添加后缀:
//slashes 如果协议需要 ://，设置为 true
//    仅需对之前列出的没有斜杠的协议，比如议 mongodb://localhost:8000/
//    auth 如果出现将会使用.
//    hostname 仅在缺少 host 时使用
//port 仅在缺少 host 时使用
//host 用来替换 hostname 和 port
//pathname 无论结尾是否有 / 将会同样处理
//search 将会替代 query属性
//无论前面是否有 / 将会同样处理
//query (对象; 参见 querystring) 如果没有 search,将会使用
//hash 无论前面是否有#，都会同样处理
console.log("format",url.format({
    protocol: "http",
    slashes: true,
    auth: null,
    host: 'www.imooc.com:8080',
    port: '8080',
    hostname: 'www.imooc.com',
    hash: '#floor1',
    search: '?c=angularjs',
    query: { c: 'angularjs' },
    pathname: '/course/list',
    path: '/course/list?c=angularjs',
    href: '//www.imooc.com:8080/course/list?c=angularjs#floor1' }));


//给一个基础 URL， href URL，如同浏览器一样的解析它们可以带上锚点，例如：
console.log("resolve",url.resolve('/one/two/three', 'four'));         // '/one/two/four'
console.log("resolve",url.resolve('http://example.com/', '/one'));    // 'http://example.com/one'
console.log("resolve",url.resolve('http://example.com/one', '/two')); // 'http://example.com/two'