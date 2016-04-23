这个模块提供了一些处理 query strings 的工具，包括以下方法：

1. querystring.stringify(obj[, sep][, eq][, options]):将一个对象序列化化为一个 query string 。

    可以选择重写默认的分隔符('&') 和分配符 ('=')。

    Options 对象可能包含 encodeURIComponent 属性 (默认：querystring.escape),如果需要，它可以用 non-utf8 编码字符串。

2. querystring.parse(str[, sep][, eq][, options]):将 query string 反序列化为对象:可以选择重写默认的分隔符('&') 和分配符 ('=')。

    Options 对象可能包含 maxKeys 属性（默认：1000），用来限制处理过的健值（keys）。设置为 0 的话，可以去掉键值的数量限制。

    Options 对象可能包含 decodeURIComponent 属性（默认：querystring.unescape），如果需要，可以用来解码 non-utf8 编码的字符串。

3. querystring.escape

    escape 函数供 querystring.stringify 使用，必要时，可以重写。

4. querystring.unescape

    unescape函数供 querystring.parse 使用。必要时，可以重写。

    首先会尝试用 decodeURIComponent，如果失败，会回退，不会抛出格式不正确的 URLs。