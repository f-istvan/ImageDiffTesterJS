var generateTestData = function() {

  var fs = require('fs'),
      testPairs = [];

  var filenames = fs.readdirSync('./reference');
  filenames.forEach(function (filename) {
    
    var testPair = {
      referenceSrc: {
        src: '../reference/' + filename, 
        srcClass: 'reference' 
      },
      testSrc: {
        src: '../test/' + filename, 
        srcClass: 'test'
      },
      diffSrc: { 
        src: '',
        srcClass: 'diff'
      },
      report: null,
      processing: true,
      passed: false,
      misMatchThreshold: 0.1,
      fileName: filename
    };

    testPairs.push(testPair);

  });

  return testPairs;

}

module.exports = {
  generateTestData: generateTestData
};

