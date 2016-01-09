#mongodb介绍  
 
#下载地址  

http://mongodb.org  
##mac 的安装方式  
http://brew.sh/  
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"  
brew install mongodb  
    
#windows下 安装成服务  


  
#命令行启动
必须先创建文件夹(不能和下一步一起执行) 
mkdir data  
再启动服务
mongod --dbpath ./data  
另开一个命令行窗口 
再去执行客户端连接 mongo 

#mongodb 介绍   
- 分布式的 文件存储 数据库 c++语言编写  
- 开源 稳定 高性能 无模式 文档型(json)  
- 在NOSQL和传统的数据库之间建立一座桥梁 
#mongodb 存储结构 
```
BSON binary json 
{ 
name:'zfpx', 
age:5, 
address:{province:'beijing',city:'beijing'}, 
hobby:['smoking','drinking','eat'] 
} 
```
语法就是javascript语法 
 printjson({name:'zfpx'});

##存储的特点 
- 基本单元是文件(Document)(BSON), 
- 灵活高效，数据以二进制形式保存在硬盘上 
- 支持内嵌的文档对象和数组对象 
- 扩充了大量的JSON不支持的类型 
null  
32位和64位整型  
对象ID 内置 的默认ID对象  
日期 
正则 
javascript代码块  
任意二进制对象 
.....  

##数据库和集合命名规范  
- 不能是空字符串  
- 不能含有\0   
- 最多64个字节  

#mongodb使用  

##创建数据库和文档  
切换到school数据库  
use school;  
插一个文档进去  
db.user.insert({name:'zfpx',age:6});  

##ObjectId
存储在mongodb中的每个document都有一个默认的ID 
名字是固定的就叫_id
可以是任何类型，默认是 ObjectId
55a509f0 3fc942 c8e2 c3b895
4字节的 unix时间戳  
3个字节 的mongodb服务器的机器名  
2个字节 进程ID  
3字节 是随机数开发的计数器生成  

##查看所有的数据库  
show dbs;  

##查看所有的集合  
- db.getCollectionNames()  
##插入单条数据
db.user.insert({username:'zfpx',age:6})
##批量插入
db.user.insert([{username:'zfpx1',age:1},{username:'zfpx2',age:2}]);
##查询文档
db.find({条件},{返回的字段})
1. 完全匹配
db.user.find({age:2,username:'zfpx2'});
2.范围查询
db.user.find({age:{$gt:2}});
3.字段为true,字段为false不显示
db.user.find({age:{$lt:2}},{username:1,_id:0});
4.修改文档
multi true 时表示修改匹配到所有文档 false 只修改匹配到的第一个文档
upsert true 时表示如果匹配不到记录，则插入
db.user.update({age:{$gt:1}},{$set:{username:'zfpx'}},{multi:true});
db.user.update({username:'888'},{username:999},{upsert:true});
5.增加一个数组的属性 
 db.user.update({},{$set:{hobbys:['smoking','drinking']}})
6. 匹配所有元素
 db.user.find({hobbys:['smoking','drinking']});
7. 匹配一个元素
db.user.find({hobbys:'smoking'});
8.匹配第几个元素 通过索引
db.user.find({'hobbys.0':'smoking'});
9.匹配某几个元素
db.user.find({hobby:{$in:['drink','dry']}});
10.嵌套文档的插入和查询
db.user.insert({home:{province:'guangdong',city:'shenzhen'}});
db.user.find({'home.city':'shenzhen'});
11.多个条件的关联查询
db.user.insert({age:6,score:70});
db.user.insert({age:3,score:30});
db.user.insert({age:9,score:90});
db.user.find({$and:[{age:{$lt:9}},{score:{$gt:30}}]});
db.user.find({$or:[{age:{$lt:9}},{score:{$gt:30}}]});
12 分页查询 每页2条，查询第二页的数据
- 多少条记录  count
- 跳过多少条记录 skip 
- 限制返回记录的条件 limit  
- 排序sort
 db.user.find({}).count();
 db.user.find({}).sort({age:-1}).skip(2).limit(2);
 
