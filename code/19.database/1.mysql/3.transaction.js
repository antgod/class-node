/**
 * 事务 的四个基本特性
 * Atomic 原子性  要么全成功 要么全失败
 * Consistency 一致性
 * Isolation 隔离性 多个事务可以同时执行，但应该独立
 * Durability 持久性 对数据库的操作是持久的
 */
/**
 * 开始 begin
 * 执行
 * 结束 commit提交确认 rollback 回滚
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'123.57.143.189',
    port:3306,
    user:'root',
    password:'zfpx2015',
    database:'db201504'
});

connection.connect();
connection.beginTransaction(function(err){
    if(err) throw err;
    connection.query('update user set balance=0 where id=1',function(err,result){
        if(err){
            connection.rollback(function(){
                throw err;
            })
        }
        connection.query('update user1 set balance=3000 where id=2',function(err,result){
            if(err){
                connection.rollback(function(){
                    throw err;
                })
            }
            connection.commit(function(err){
                if(err){
                    connection.rollback(function(){
                        throw err;
                    })
                }
            });
            console.log('转账成功');
        });
    })
})