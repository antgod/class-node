/**
 * readFile
 */

var fs = require('fs');
fs.readFile('1.md', 'utf8', function (err, data) {
    if (err) {
        console.error(err);
    } else
        console.log(data);
});

/*
 try {
 var s = fs.readFileSync('3.md', 'utf8');
 console.log(s);
 } catch (ex) {
 console.error(ex);
 }*/


try {
    fs.readFile('2.md', 'utf8', function (err, data) {
       try{

       }
    });
} catch (ex) {
    console.error(ex);
}
console.log('err');