/**
 * request to get your json result.
 * @param {express()} app 
 */
 function request(app) {
  app.get('/', function (req, res) {
    // 將你要提供的資料在此定義.
    const result = {
      value: "Hi, this is json-server home."
    };

    res.render('index', {
      data: result
    });
  });
}

module.exports = { request }