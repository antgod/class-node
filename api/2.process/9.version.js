//process.version
//一个编译属性，包含 NODE_VERSION.

console.log('Version: ' + process.version);

//process.versions
//一个属性，包含了 node 的版本和依赖.

console.log(process.versions);

//{ http_parser: '1.0',
//    node: '0.10.4',
//    v8: '3.14.5.8',
//    ares: '1.9.0-DEV',
//    uv: '0.10.3',
//    zlib: '1.2.3',
//    modules: '11',
//    openssl: '1.0.1e' }

console.log(process.config)

