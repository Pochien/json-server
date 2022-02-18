/**
 * Api router.
 */

/**
 * Import file system
 */
var fs = require('fs');
var path = require('path');
 
/**
 * 使用route, 把所有對應的頁面都涵蓋進來.
 * @param {express()} app 
 */
 function route(app) {


  
  require('./api/index.js').request(app);
  require('./api/get.js').request(app);
  //require('./api/get1.js').request(app);
}

module.exports = { route }