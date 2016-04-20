1. url与uri

url:偏重定位:只能有数字,字母和几个符号,其他必须转意
uri:偏重标示


2. 名词解释

Protocol
客户端向服务器端传送数据所依据的协议名称。

Scheme
可以返回当前页面使用的协议，http 或是 https

host
域名，包括端口

hostname
主机名，不包括端口

path
资源绝对路径，带查询参数

pathname
不带查询参数

search与query
字符串与对象


3. 具体解释

这个模块包含分析和解析 URL 的工具。调用 require('url') 来访问模块。

解析 URL 对象有以下内容，依赖于他们是否在 URL 字符串里存在。任何不在 URL 字符串里的部分，都不会出现在解析对象里。例子如下：

'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'

href: 准备解析的完整的 URL，包含协议和主机（小写）。

例子： 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'

protocol: 请求协议, 小写.

例子： 'http:'

slashes: 协议要求的斜杠（冒号后）

例子： true 或 false

host: 完整的 URL 小写 主机部分，包含端口信息。

例子： 'host.com:8080'

auth: url 中的验证信息。

例子： 'user:pass'

hostname: 域名中的小写主机名

例子： 'host.com'

port: 主机的端口号

例子： '8080'

pathname: URL 中的路径部分，在主机名后，查询字符前，包含第一个斜杠。

例子： '/p/a/t/h'

search: URL 中得查询字符串，包含开头的问号

例子： '?query=string'

path: pathname 和 search 连在一起

例子： '/p/a/t/h?query=string'

query: 查询字符串中得参数部分，或者使用 querystring.parse() 解析后返回的对象。

例子： 'query=string' or {'query':'string'}

hash: URL 的 “#” 后面部分（包括 # 符号）

例子： '#hash'