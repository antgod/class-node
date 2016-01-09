/**
 * 创建目录
 * mkdir
 * path 路径
 * mode 指定创建的文件夹的权限
 * callback
 *
 */
var fs = require('fs');
/*
var systemPath = require('path');
//makeDir('test\\test3');

function makeDir(path,mode){
    if(mode ==undefined){
        mode =0777 & (-process.unmask);//0755
        var parts = path.split(systemPath.sep);//win \ linux /
        for(var i=0;i<parts.length;i++){// ./a/b/c
            var sa = parts.slice(0,i+1).join(systemPath.sep);
            if(fs.existsSync(sa)){
                var st;
                if(st = fs.statSync(sa)){
                    if(!st.isDirectory()){
                        throw new Error('路径存在但不是文件夹');
                    }
                }
            }else{
                break;
            }

        }
        for(var i=0;i<parts.length;i++){
            var build = parts.slice(0,i+1).join(systemPath.sep);
            fs.mkdirSync(build,mode);
        }
    }
}

fs.readdir('./test',function(err,files){
    console.log(files);
})

fs.stat('./test',function(err,stats){
    console.log(stats);
});
//判断是一个文件夹是否存在
fs.exists('./test',function(exits){
    console.log(exits);
});
//得到一个相对路径 的绝对路径
fs.realpath('./test',function(err,path){
    console.log(path);
})
//修改目录信息 访问时间和修改时间
fs.utimes('./test',new Date(),new Date(),function(err){
    console.log('success');
});
//修改文件的权限
fs.chmod('./test',0777,function(){

});

//移动 文件或目录
fs.rename('./test2.txt','./test5.txt',function(){
    console.log('不能跨盘符');
})
*/

var p = './zf.txt';
fs.stat(p,function(err,stat){
    console.log('before '+stat.size);
    fs.truncate(p,1024,function(){
        fs.stat(p,function(err,stat2){
            console.log('after '+stat2.size);
        });
    })
});
//删除不为空的文件夹
fs.rmdir('zf');
//1. 从最底级的文件夹开始删除。
//2. fs.unlinkSync(src);删除文件
//3. fs.rmdir('zf.txt');删除空的文件夹的
//4. readdir 读取文件夹下的所有文件