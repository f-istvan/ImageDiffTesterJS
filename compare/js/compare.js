var compareApp = angular.module('compareApp', ['ngRoute']);

compareApp.config(function ($routeProvider) {
  var defaultMismatchThreshold = 1;

  $routeProvider
    .when("/compare", { action: 'url' })
    .otherwise({ action: 'url' });

  resemble.outputSettings({
    errorColor: { red: 255, green: 0, blue: 255 },
    errorType: 'movement',
    transparency: 0,
    largeImageThreshold: 1200
  });

});

compareApp.controller('MainCtrl', function ($scope, $route, $http) {
  $scope.testPairs = [];
  $scope.testPairsCompleted = 0;
  $scope.passedCount = 0;
  $scope.testDuration = 0;
  $scope.testIsRunning = true;
  $scope.detailFilterOptions = ['failed','passed','all','none'];
  $scope.statusFilter = 'none';

  $scope.displayOnStatusFilter = function (testPair) {
    var show = false;
    if ($scope.statusFilter == 'all') {
      show = true;
    } else if ($scope.statusFilter == 'failed') {
      show = !testPair.passed;
    } else if ($scope.statusFilter == 'passed') {
      show = testPair.passed;
    }
    return show;
  };

  $scope.$on("$routeChangeSuccess", function() {
    $scope.runFileConfig();
  });

  $scope.runFileConfig = function() {
    $http.get('../getTestData').success(function (testPairs) {
      testPairs.forEach(function (tp) {
        $scope.testPairs.push(tp);
      });
      $scope.compareTestPairs($scope.testPairs);
    });
  };

  $scope.compareTestPairs = function compareTestPairs(testPairs) {
    var startTime = new Date(),
        maxlLimitAsyncOperationsAtATime = 1;

    async.eachLimit(
      testPairs, 
      maxlLimitAsyncOperationsAtATime, 
      test, 
      allTestsFinishedCallback
    );

    function test(testPair, callbackFormAsyncJS) {
      $scope.compareTestPair(testPair, function(testPair) {
        if (testPair.passed) {
          $scope.passedCount++;
        }
        $scope.testPairsCompleted++;
        $scope.testDuration = (new Date()-startTime);
        $scope.$digest();
        callbackFormAsyncJS(); // must be called
      });
    }

    function allTestsFinishedCallback() {
      $scope.testIsRunning = false;
      if($scope.passedCount === $scope.testPairsCompleted) {
        $scope.statusFilter = 'passed';
      } else {
        $scope.statusFilter = 'failed';
      }
      $scope.$digest();
    }

  };

  $scope.compareTestPair = function compareTestPair(testPair, cb) {
    testPair.processing = true;

    var diff = resemble(testPair.referenceSrc.src).compareTo(testPair.testSrc.src).onComplete(function(diffData){
      testPair.report = JSON.stringify(diffData,null,2);
      testPair.diffSrc.src = diffData.getImageDataUrl();
      testPair.processing = false;
      testPair.passed = (diffData.isSameDimensions && diffData.misMatchPercentage < testPair.misMatchThreshold);
      if (cb) cb(testPair);
    });
  };

});
