var express = require('express'),
    app     = express();

var rootDir = __dirname;
var port = 3001;

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(rootDir));
app.listen(port);

console.log('Listening on localhost :' + port);
console.log('Press Ctrl + C to stop.');