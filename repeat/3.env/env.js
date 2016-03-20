/**
 * Created by lihongji on 16/3/8.
 */

//env=env node env -a -b c
//console.log(process.env);
//console.log(process.argv);

require("optimist")
    .usage("webpack " + require("../package.json").version + "\n" +
        "Usage: https://webpack.github.io/docs/cli.html");

console.log("webpack " + require("../package.json").version + "\n" +
    "Usage: https://webpack.github.io/docs/cli.html")


