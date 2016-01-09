var express = require('express');//导入express中间件
var path = require('path');//处理路径
var favicon = require('serve-favicon');//处理收藏夹图标
var logger = require('morgan');//处理日志
var cookieParser = require('cookie-parser');//解析cookie
var bodyParser = require('body-parser');//解析post请求体

var routes = require('./routes/index');//index路由
var users = require('./routes/users');//user路由

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));//设置日志
app.use(bodyParser.json());//解析JSON
app.use(bodyParser.urlencoded({ extended: false }));//解析序列化表单
app.use(cookieParser());//解析cookie req.headers.cookie
app.use(express.static(path.join(__dirname, 'public')));//静态文件服务器
app.use('/', routes);
app.use('/users', users);
//app.use('/articles', articles);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
