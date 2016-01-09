/**
 *
 */
var mongoose = require('mongoose');
var assert = require('assert');
var connection =
    mongoose.createConnection('mongodb://123.57.143.189/db201504',function(err){
        assert.equal(null,err);
    })
var connection2 =
    mongoose.createConnection('mongodb://123.57.143.189/school',function(err){
        assert.equal(null,err);
    })
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
//定义一个作者的shema
var AuthorSchema = new Schema({
    name:String
});

var Author = connection.model('Author',AuthorSchema);
var CommentSchema = new Schema({
    content:String,
    date:Date
});
var ArticleSchema = new Schema({
    title:{type:String,index:true},
    content:String,
    author:{type:ObjectId,ref:'Author'},
    stat:{
        favs:Number,
        visited:Number
    },
    comment:[CommentSchema]
});
var Article = connection.model('Article',ArticleSchema);
var author = new Author({
    name:'zfpx'
});
/*
var ChildSchema = new Schema({
    name:String
},{collection:'child'});
var Child = connection.model('Child',ChildSchema);
var Child2 = connection2.model('Child',ChildSchema);
var child = new Child({name:'peng'});
var child2 = new Child2({name:'peng'});
child.save(function(err,result){
    assert.equal(err,null);
    console.log(result);
});
child2.save(function(err,result){
    assert.equal(err,null);
    console.log(result);
});*/
/*author.save(function(err,result){
    assert.equal(err,null);
    console.log(result);
});*/

ArticleSchema.pre('save',function(next){
    this.stat.visited = 500;
    this.date = new Date();
    next();
});

var article = new Article({
    title:'title5',
    content:'content5',
    author:'55aa170d4e635f8815ad57d3',
    stat:{favs:0,visited:0},
    comment:[{content:'comment5',date:new Date()}]
});
article.save(function(err,result){
    assert.equal(err,null);
    console.log(result);
});


var pageNum = 2;
var pageSize = 2;
Article.count({author:'55aa170d4e635f8815ad57d3'},function(err,total){
    var skip = (pageNum-1)*pageSize;
    var pageNums = Math.ceil(total/pageSize);
    Article.find({author:'55aa170d4e635f8815ad57d3'}).where('content', 'content4').skip(skip)
        .limit(pageSize).sort({name:1}).populate('author').exec(function(err,result){
            assert.equal(err,null);
            console.log(pageNums,result);
        });
});

/*
Article.findOne({},function(err,result){
    assert.equal(null,err);
    console.log(result);
});*/
