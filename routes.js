module.exports = function(app) {
  
  var testService = require('./node_services/testService')(app);
  
  return {
    testService: testService
  };

}
