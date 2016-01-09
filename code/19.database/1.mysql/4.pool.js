/**
 * 连接池
 *
 */
var mysql = require('mysql');
var pool = mysql.createPool({
    host:'123.57.143.189',
    port:3306,
    user:'root',
    password:'zfpx2015',
    database:'db201504',
    connectionLimit:2,//连接池中最多可以创建的连接数量
    queueLimit:2 //队列中的等待连接的数量
});

/*pool.query('select * from user',[],function(err,result){
    if(err)
       throw err;
    console.log(result);
});*/

//连接被创建时触发
pool.on('connection',function(){
    console.log('connected');
});
//当一个回调压入队伍中等待连接的时候触发
pool.on('enqueue',function(){
    console.log('enqueue');
});
function startQuery(){
    pool.getConnection(function(err,connect){
        connect.query('select * from user',function(err,rows){
            console.log(rows.length);
            setTimeout(function(){
                connect.release();
            },2000)
        });
    });
}
startQuery();
startQuery();
startQuery();
startQuery();