var List = require('./list.js');
//var delegateMap = {
//    onInserted: function () {
//    },
//    onPushed: function(){},
//    onRemoved: function(){},
//    onUpdated: function(){}
//};
var callback = function () {
    var _this = this;
    return {
        onInserted: function(){},
        onPushed: function(context, item){
            if(context.namespace == 'qq'){
                console.log('qq')
            }else if(context.namespace == 'book'){
                console.log('book')
            }
            // 处理push的回调
        },
        onRemoved: function(){},
        onUpdated: function(){}
    }
};
var fn = callback.call(this);
var qqList = new List({
    delegate:fn
    //namespace: 'qq'
});
qqList.namespace = 'qq';
var bookList = new List({
    delegate:fn
});
bookList.namespace = 'book';
qqList.push({qq: 1234567, nickname: 'nickname1'});
bookList.push({name: 'nodejs权威指南'});