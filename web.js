var express = require("express");
var app = express();

app.use('/', express.static('build/'));

app.listen(process.env.PORT || 5000);
