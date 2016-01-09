var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var assert = require('assert');


MongoClient.connect
('mongodb://123.57.143.189/db201504',
    function (err, db) {
        console.log(db);
        assert.equal(null, err);
        //插入数据
        /*db.collection('students').insert([{name:'zfpx2',age:2},{name:'zfpx3',age:3}],function(err,result){
         assert.equal(null, err);
         console.log('connected to the server');
         db.close();
         });*/
        //分页查询
        db.collection('user').find({}).skip(5).limit(5)
            .sort({age: 1}).toArray(function (err, result) {
                console.log(result);
        });
        db.collection('user').findOne();
        db.collection('user').updateOne({1:1},{})
        db.collection('user').updateMany({1:1},{})
        db.collection('user').findOneAndUpdate({1:1},{})
        db.collection('user').removeOne({1:1},{});
        db.collection('user').removeMany({1:1},{});
    });

