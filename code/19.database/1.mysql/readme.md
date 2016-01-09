#mysql
多用户 多线程 
SQL 结构化查询语言
DDL 数据库定义语言 DML 数据操作语言
#DML基本使用

1.创建数据库
create database db201504;

2.查看数据库
show databases;
show databases like 'db%';

4. 插入数据
insert into stu(name,age) values('zfpx',6);

5. 查询数据
select * from stu;

6.更新记录
update stu set age=0 where age is null;

7.删除记录
delete from stu where age = 0;

#DDL使用

1.创建表
CREATE TABLE `stu` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`name`  varchar(32) CHARACTER SET utf8 ,
`age`  int(11) NULL DEFAULT 0 ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
DEFAULT CHARACTER SET=utf8 
AUTO_INCREMENT=1

2.增加一列
alter table stu add home varchar(32) default 'beijing';

3.修改一列
alter table stu modify home varchar(16) default 'tianjin';

##高级查询
select fields       //查询哪些列
  from table_list   //从哪些表里查
where               //指定查询范围
group by            //对结果进行分组
having              //分组后的结果必须满足的样件 至少选了2门课的学生
order by sort       //排序
limit               //限定返回的行数

select stu.name,count(*) from 
   stu,relation,lesson
where stu.id = relation.stu_id and lesson.id = relation.lesson_id
group by stu.name
having count(*) >=2
order by count(*) desc
limit 2;

#mysql


