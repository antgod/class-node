var assert=require('assert');

//assert(true,'message');
//
//
//assert.equal(true, 1=="1", 'message');


//assert.fail(1, 2, "message", '.');

assert.throws(
    function() {
        throw new Error("Wrong value");
    },
    /value/
);