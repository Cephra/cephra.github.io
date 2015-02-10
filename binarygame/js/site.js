angular.module("ngBinGameApp", []).
controller("ngBinGameController", [ "$scope", function ($scope) {
  var currAnswer = "";
  var randInt = function (max) {
    return Math.floor(Math.random()*(max+1));
  };
  $scope.history = [];
  $scope.strAnswer = ""; 

  var genQuestion = function () {
    var pad8 = function (s) {
      return Array(8+1-s.length).join("0")+s;
    };
    var initNum = randInt(255);
    if (randInt(1) === 1) {
      // find binary
      currAnswer = pad8(initNum.toString(2));
      $scope.currQuestion = initNum.toString();
    } else {
      // find decimal 
      currAnswer = initNum.toString();
      $scope.currQuestion = pad8(initNum.toString(2));
    }
  };
  genQuestion();

  $scope.checkAnswer = function () {
    var result = {
      q: $scope.currQuestion,
      a: $scope.strAnswer,
      c: "",
    };
    if ($scope.strAnswer === currAnswer) {
      result.p = 1;
    } else {
      result.p = 0;
      result.a = "Falsch";
      result.c = currAnswer;
    }

    // push answer on the stack
    // and reset
    $scope.history.push(result);
    $scope.strAnswer = "";

    // generate another question
    genQuestion();
  };

  $scope.resetHistory = function () {
    $scope.history = [];
  };

  $scope.getPoints = function () {
    var points = 0;
    $scope.history.forEach(function (i) {
      points += i.p;
    });
    return points;
  };
}]);
