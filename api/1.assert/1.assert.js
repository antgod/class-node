var assert=require('assert');

try{
    assert(null,'message');
}catch (e){
    console.log(e.stack)
}

//
//
//assert.equal(true, 1=="1", 'message');


//assert.fail(1, 1, "message", '.');

//assert.throws(
//    function() {
//        throw new Error("Wrong value");
//    },
//    /value/
//);