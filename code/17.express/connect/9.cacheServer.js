var express = require('express');
var static = require('./static');
var app = express();
app.use(static({root:'.',maxAge:3600}));
app.listen(3000);