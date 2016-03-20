var express = require('express'),
    app     = express();

var port = 3001;

require('./routes')(app);

app.use(express.static(__dirname));
app.listen(port);

console.log('Listening on localhost :' + port);
console.log('Press Ctrl + C to stop.');