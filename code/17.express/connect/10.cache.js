/**
 * Created by lihongji on 2015/7/12.
 */

var express=require("express");
var static=require("./static");
var app=express();
app.use(static({root:'.',maxAge:0.1}));
app.listen(3000);