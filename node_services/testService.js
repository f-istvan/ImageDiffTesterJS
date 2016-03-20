module.exports = function(app) {
  
  var helper = require('../node_helpers/testConfigHelper');

  app.get('/getTestData', function (req, res) {
    res.json( helper.generateTestData() )
  });

}