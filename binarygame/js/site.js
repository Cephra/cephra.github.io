angular.module("ngBinGameApp", []).
controller("ngBinGameController", [ "$scope", function ($scope) {
  var currAnswer = {};
  var randInt = function (max) {
    return Math.floor(Math.random()*(max+1));
  };
  var sanitize = function (s) {
    var rs = s;
    rs = rs.substring(rs.length-8);
    rs = Array(8+1-rs.length).join("0")+rs; 
    return rs;
  };
  $scope.history = [];
  $scope.strAnswer = ""; 

  var genQuestion = function () {
    var initNum = randInt(255);

    if (randInt(1) === 1) {
      // find binary
      currAnswer.v = 
        sanitize(initNum.toString(2));
      currAnswer.t = "b";
      $scope.currQuestion = initNum.toString();
    } else {
      // find decimal 
      currAnswer.v = initNum.toString();
      currAnswer.t = "d";
      $scope.currQuestion = 
        sanitize(initNum.toString(2));
    }
  };
  genQuestion();

  $scope.checkAnswer = function () {
    var tmpAnswer = $scope.strAnswer;
    $scope.strAnswer = "";
    
    // answer validation
    if (tmpAnswer === "") {
      tmpAnswer = "Ihre Antwort"
    } else if (currAnswer.t === "b") {
      // allow for binary answers < 8 bit
      tmpAnswer = sanitize(tmpAnswer);
    }

    // object to store the result
    var result = {
      q: $scope.currQuestion,
      a: tmpAnswer,
      c: "",
    };

    // check answer
    if (tmpAnswer === currAnswer.v) {
      result.p = 1;
    } else {
      result.p = 0;
      result.c = currAnswer.v;
    }

    $scope.history.push(result);
    genQuestion();
  };

  $scope.resetGame = function () {
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
