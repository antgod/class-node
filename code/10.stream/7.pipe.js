/**
 * Created by lihongji on 16/3/20.
 */

var fs=require("fs");
fs.createReadStream('./source.txt').pipe(fs.createWriteStream('./target.txt'));