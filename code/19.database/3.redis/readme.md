#redis
BSD开源协议的 C语言编写的数据库
存放的是key-value
#特点
1. key value数据库
2. 内存数据库 也可以把数据存放在硬盘上，也就是持久化
3. 数据类型 字符串 哈希 链表 无序集合 有序集合
#数据操作
##字符串类型
set
get
incr name
##哈希类型
hset
hget
hmset
hgetall
##链表
rpush
lpush
rpop
lpop
lrange
##无序集合
唯一性
sadd
sinter
sdiff
sunion
#有序集合
zadd
zrem 
zrange
zrange persons 0 -1 withscores 



