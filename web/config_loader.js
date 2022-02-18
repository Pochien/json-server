/**
 * server host config loader:
 * Load config from $Root/config/host.json
 */
'use strict'

// 引用 path套件.
const path = require('path');
const nconf = require('nconf');
const async = require('async');

// config file.
var configFile = path.join(path.join(__dirname, '../config'), 'host.json');

var protocol;
var hostName;
var port;

/**
 * 載入$Root/config/ws_server.json設定檔.
 */
function load(callback) {
  // 依序.
  nconf.use('file', { file: configFile });

  // 載入
  nconf.load(function (err, data) {
    if (err) {
      console.error(err);
      callback(err, null);
    } else {
      console.log('json-server config:', configFile, 'loaded.');
      protocol = nconf.get('protocol');
      hostName = nconf.get('hostName');
      port = nconf.get('port');
      data = { "protocol": protocol, "hostName": hostName, "port": port };
      callback(null, data);
    }
  });
}

module.exports = { load, protocol, hostName, port }