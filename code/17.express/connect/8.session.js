/**
 * Created by lihongji on 2015/7/12.
 */

var express=require('express');
var path=require("path") ;
var app=express();
var fs=require("fs");

app.use(session({
    secret:'abc'
}))