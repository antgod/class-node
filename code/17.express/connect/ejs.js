/**
 * Created by lihongji on 2015/7/14.
 */

var ejs=require("ejs");


var str='<% if(user){ %> <%=user.name%> <% } %>';


var template = ejs.compile(str, {user:{name:'lhj'}});
var a=template({user:{name:'lhj'}});


console.log(a);