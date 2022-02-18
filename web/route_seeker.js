/**
 * Get all json directories and files to be route path.
 */

const path = require('path');
const fs = require('fs');
const jsonHome = path.join(__dirname, '../json');
var routeList = [];

/**
 * Getting all directories and files under json home.
 */
function getJsonRoutes(dirPath) {
  fs.readdir(dirPath, {withFileTypes: true}, function (err, files) {
    if (err) {
      return console.error(err);
    }
    files.forEach(function (file) {
      if (file.isDirectory()) {
        getJsonRoutes(path.join(dirPath, file.name));
      }
      if (file.isFile()){
        let dirName = '';
        let fileName = file.name.replace(/\.[^/.]+$/, ''); //除去副檔名.

        dirName = dirPath.replace(jsonHome, '');
        dirName = dirName.replace(/\\/g,'/');
        routeList.push(dirName + "/" + fileName);
      }
    });
  });
  return routeList;
}

module.exports = { getJsonRoutes }