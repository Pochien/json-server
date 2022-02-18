/**
 * Get all json directories and files to be route path.
 */
const path = require('path');
const fs = require('fs');
const jsonHome = path.join(__dirname, '../../json');
// Async
const async = require('async');

/**
 * request to get your json result.
 * @param {express()} app 
 */
function request(app) {
  //
  getJsonRoutes(jsonHome);

  /**
   * Getting all directories and files under json home.
   */
  function getJsonRoutes(dirPath) {
    //console.log('dir path:', dirPath);
    fs.readdir(dirPath, { withFileTypes: true }, function (err, files) {
      if (err) {
        console.error(err);
      } else {
        files.forEach(function (file) {
          if (file.isDirectory()) {
            getJsonRoutes(path.join(dirPath, file.name));
          }
          if (file.isFile()) {
            let dirName = '';
            let fileName = file.name.replace(/\.[^/.]+$/, ''); //除去副檔名.
            dirName = dirPath.replace(jsonHome, '');
            dirName = dirName.replace(/\\/g, '/');  //除去反斜線.
            let routePath = dirName + "/" + fileName;
            console.log(dirName + "/" + fileName, 'added to route path.');
            // 加入app route.
            addToGetRoute(routePath);
          }
        });
      }
    });
  }

  /** 
   * Add path to route. 
   */
  function addToGetRoute(routePath) {
    // set routePath to route.    
    app.get(routePath, function (req, res) {
      //console.log('req.originalUrl:', req.originalUrl);
      let jsonData = {};

      async.series([
        // step1: get json.
        function (callback) {
          //console.log('step1:', jsonData);

          let fileName = path.join(jsonHome, routePath + '.json');        
          // 載入
          fs.readFile(fileName, function (err, data) {
            if (!err) {
              // console.log('json file', fileName, 'loaded.');
              jsonData = data.toString();
              //console.log('json data:', jsonData);
              callback(jsonData);
            } else {
              console.error(err);
              callback(err);              
            }
            callback();
          });
        },

        // step2: set response render.
        function (callback) {
          //console.log('step2:', jsonData);
          console.log(routePath, 'requested, response data:', jsonData);
          
          res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
          res.write(jsonData);
          res.end();
        }
      ]);
    });
  }
}

module.exports = { request }