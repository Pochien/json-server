/**
 * 應用程式入口.
 */

/** =====================================================================
 * 引入Log4js:
 * Log4js會為log加上timestamp.
 */
 var log4js = require('log4js');
 log4js.configure({
   appenders: {
     console: { type: 'console' }, //控制台輸出
     default: { type: 'dateFile', 
       filename: 'logs/server', "pattern":'yyyyMMdd.log',alwaysIncludePattern:true,
       maxLogSize: 1000000, backups: 10
     }
   },
   categories: {
     default: { appenders: ['console','default'], level: 'all' }
   }
 });
 
 var logger = log4js.getLogger();
 console.log = logger.info.bind(logger);
 console.error = logger.error.bind(logger);
 console.warn = logger.warn.bind(logger);
 console.info = logger.info.bind(logger);
 console.debug = logger.debug.bind(logger);
 console.trace = logger.trace.bind(logger);
 logger.level = 'all';
 // =====================================================================
 
 /**
  * web server 啟動.
  */
 const web_server = require('./web/web_server');
 web_server.start();
 