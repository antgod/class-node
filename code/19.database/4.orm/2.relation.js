var Waterline = require('waterline');
var diskAdaptor = require('sails-disk');//适配器，可以支持不同的引擎
var mysqlAdaptor = require('sails-mysql');//适配器，可以支持不同的引擎
var mongoAdaptor = require('sails-mongo');
var config = {
    //定义适配器
    adapters:{
        default:diskAdaptor,
        disk:diskAdaptor,
        mysql:mysqlAdaptor,
        mongo:mongoAdaptor
    },
    //如何连接数据库
    connections:{
        myLocalDisk:{
            adapter:'disk',//使用哪个适配器
            filePath:'./data'//数据存储的目录
        },
        myLocalMysql:{
            adapter:'mysql',//使用哪个适配器
            host:'123.57.143.189',
            port:3306,
            user:'root',
            password:'zfpx2015',
            database:'test'
        },
        myLocalMongo:{
            adapter:'mongo',//使用哪个适配器
            host:'123.57.143.189',
            port:27017
        }
    },
    //当集合的定义发生变化的时候自动更改数据库
    defaults:{
        migrate:'alter'
    }
}

var BoyFriend = Waterline.Collection.extend({
    identity:'boyfriend',//模型的名称,
    connection:'myLocalMysql',//使用哪个连接，数据存储在哪里
    attributes:{//定义有哪些属性 以及类型和约束
        first_name:'string',
        last_name:'string',
        girlfriend:{
            model:'girlfriend'
        }
    }
});

var GirlFriend = Waterline.Collection.extend({
    identity:'girlfriend',//模型的名称,
    connection:'myLocalMongo',//使用哪个连接，数据存储在哪里
    attributes:{//定义有哪些属性 以及类型和约束
        first_name:'string',
        last_name:'string'
    }
});

var orm = new Waterline();
orm.loadCollection(BoyFriend);//把集合注册到模块里去
orm.loadCollection(GirlFriend);//把集合注册到模块里去
orm.initialize(config,function(err,models){
    //创建一个男朋友
    models.collections.boyfriend.create({
        first_name:'yang',
        last_name:'guo'
    },function(err,boyfriend){
        //再创建一个女朋友
        models.collections.girlfriend.create({
            first_name:'xiao',
            last_name:'nongnv'
        },function(err,girlfriend){
            //再更新男朋友的字段
            models.collections.boyfriend.update({id:boyfriend.id},{
                girlfriend:girlfriend.id
            },function(){
                //执行查询
                models.collections.boyfriend.find({}).populate('girlfriend').exec(console.log);
            });
        });
        //console.log(ret);

    });
});
