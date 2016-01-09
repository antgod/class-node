/*
 增
 删
 改
 查
 length
 */
/**
 *
 */
var checkFuncList = [
    'onInserted',
    'onPushed',
    'onRemoved',
    'onUpdated'
];
var checkDelegate = function(delegate){
    for(var i in checkFuncList){
        var fn = delegate[checkFuncList[i]];
        if(!fn || typeof fn != 'function'){
            console.warn('%s 没有引用', checkFuncList[i]);
        }
    }
};
function List(options){
    this.list = [];
    this.delegate = options.delegate;
    checkDelegate(this.delegate);
    //this.namespace = options.namespace;
}
var prototype = List.prototype;
// 追加到列表
prototype.push = function(item){
    this.list.push(item);
    this.delegate.onPushed(this, item);
};
// 追加到某一项后面
prototype.insert = function(item, afterItem){
    var index = this.indexOf(afterItem);
    if(index > -1){
        this.list.splice(index + 1, 0, item);
        this.delegate.onInserted(this, item);
        return true;
    }
    return false;
};
// 更新某一项的值
prototype.update = function(index, newItem){
    var item = this.list[index];
    if(item){
        item = newItem;
        return true;
    }
    return false;
};
// 获取某一项的索引
prototype.indexOf = function(item){
    for(var i = 0; i < this.length(); i++){
        if(this.list[i] == item){
            return i;
        }
    }
    return -1;
};
// 删除某一项
prototype.remove = function(item){
    var index = this.indexOf(item);
    if(index > -1){
        this.list.splice(index,1);
        return true;
    }
    return false;
};
// 判断是否为空
prototype.isEmpty = function(){
    return this.length() == 0;
};
// 返回list的长度
prototype.length = function(){
    return this.list.length;
};

module.exports = List;