/**
 * Created by lihongji on 2015/7/12.
 */
 var express=require('express');
var path=require("path") ;
var app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/')); //设置模板存放模板


//app.engine('.html',require('ejs')__express);  //修改为html
app.get('/',function(req,res){
   res.render('index',{name:'<h1>zfpx</h1>',books:[{name:'a'},{name:'b'}]});
});
app.listen(3000);
