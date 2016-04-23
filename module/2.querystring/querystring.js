var querystring=require('querystring') ;


console.log('stringify',querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' }));

console.log('stringify',querystring.stringify({foo: 'bar', baz: 'qux'}, ';', ':'));

console.log(querystring.parse('foo:bar;baz:qux',';', ':'));

// Suppose gbkEncodeURIComponent function already exists,
// it can encode string with `gbk` encoding
console.log('stringify',querystring.stringify({ w: '中文', foo: 'bar' }, null, null,{encodeURIComponent: 'gbkEncodeURIComponent'}));
console.log('stringify',querystring.stringify({ w: '中文', foo: 'bar' }, null, null));

console.log('escape',querystring.escape("<哈哈>"));
console.log('unescape',querystring.unescape("%3C%E5%93%88%E5%93%88%3E"));