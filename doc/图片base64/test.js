/**
 * Created by lihongji on 2015/8/26.
 */

var fs = require("fs");

var imageBuf = fs.readFileSync("bannerbg.png");

console.log(imageBuf.toString("base64"));