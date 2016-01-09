// name=value; name=value
module.exports.parse = function(str,opt){
    opt = opt || {};
    var obj = {}
    //BAIDUID=EC8492720676398CB41137EDE69EE543:FG=1; BIDUPSID= 每个key之间是分号加空格
    if(str){
        var pairs = str.split(/; */);
        pairs.forEach(function(pair) {
            var eq_idx = pair.indexOf('=')
            // skip things that don't look like key=value
            if (eq_idx < 0) {
                return;
            }
            var key = pair.substr(0, eq_idx).trim()
            var val = pair.substr(++eq_idx, pair.length).trim();

            // only assign once
            if (!obj[key]) {
                obj[key] = decodeURIComponent(val);
            }
        });
    }


    return obj;

}

module.exports.serialize = function(name,value,opt){
    opt = opt || {};
    var pairs = [name+'='+value];
    if(null != opt.maxAge){
        var maxAge = opt.maxAge-0;
        pairs.push('Max-Age='+maxAge);//最长存活时间
    }
    if(opt.domain) pairs.push('Domain='+opt.domain);
    if(opt.path) pairs.push('Path='+opt.path);
    if(opt.expires) pairs.push('Expires='+opt.expires.toGMTString());
    if(opt.httpOnly)pairs.push('HttpOnly');
    if(opt.secure) pairs.push('Secure');
    return pairs.join('; ');
}