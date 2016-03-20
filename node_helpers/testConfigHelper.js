var createTestData = function() {

  var fs = require('fs'),
      testConfig = require('../testConfig');
  
  return { 
    "testConfig": testConfig
  }

}

module.exports = {
  createTestData: createTestData
};