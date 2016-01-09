module.exports= connect;
function connect(){
    app.stack = [];
    return app;
}
function app(req,res,next){
   app.handle(req,res,next);
}
//route 路径
//fn 函数
app.use = function(route,fn){
    if('string' != typeof route){
        fn = route;
        route = '/';
    }
  this.stack.push({route:route,handle:fn});
}

app.handle = function(req,res,xxx){
    var index =0;
    var stack = this.stack;
    function next(){
        var layer = stack[index++];
        if(!layer){
            return;
        }
        var path = req.url || '/';
        var route = layer.route;
        if(path.toLocaleLowerCase().substr(0,route.length)
            !=route.toLowerCase()){
           next();
        }else{
            var flag = layer.handle(req,res);
            if(typeof flag == 'number'){
                index = flag;
                next(index);
            }else if(!flag){
                next(index);
            }
        }

    }
    next();
}