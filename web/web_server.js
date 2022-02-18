/**
 * Web server.
 */

/**
 * 使用node.js express framework作為page tamplete.
 */
const path = require('path');
var express = require('express');
var app = express();

/**
 * Get host config
 */
var protocol = 'http';
var hostName = 'localhost';
var port = 8888;
const loader = require('./config_loader');
loader.load(function (err, data) {
  if (err) {
    console.error(err);
  } else {
    protocol = data.protocol;
    hostName = data.hostName;
    port = data.port;
  }
});
// console.log('protocol:', protocol);
// console.log('host name:', hostName);
// console.log('port:', port);

/**
 * set express() app.
 * use ejs template.
 */
app.set('view engine', 'ejs');
//app.use(expressLayouts);
app.set('views', path.join(__dirname, './views'))
app.use('/', express.static('web/views'));

// bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// route pages in router.
require('./router.js').route(app);

var server;
/**
 * start web server.
 */
function start() {
  server = app.listen(port, function () {
    console.log('Your json-server running at http://' + hostName + ':' + port);
  });
}

module.exports = { start, server }