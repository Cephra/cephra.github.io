angular.module("ngBinGameApp", [])

.controller("ngBinGameController", [ "$scope", "$interval", 
    function ($scope, $interval) {
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

      var pointTimer;
      var genQuestion = function () {
        var initNum = randInt(255);
        $scope.currPoints = 30;

        if (angular.isDefined(pointTimer)) 
          $interval.cancel(pointTimer);
        pointTimer = $interval(function () {
          if ($scope.currPoints > 1) $scope.currPoints--;
        }, 1000);

        if (randInt(1) === 1) {
          // find binary
          currAnswer.v = sanitize(initNum.toString(2));
          $scope.questionType = "d";
          $scope.currQuestion = initNum.toString();
        } else {
          // find decimal 
          currAnswer.v = initNum.toString();
          $scope.questionType = "b";
          $scope.currQuestion = sanitize(initNum.toString(2));
        }
      };
      genQuestion();

      $scope.checkAnswer = function () {
        var tmpAnswer = $scope.strAnswer;
        $scope.strAnswer = "";
        
        // answer validation
        if (tmpAnswer === "") {
          tmpAnswer = "Ihre Antwort";
        } else if ($scope.questionType === "d") {
          // allow for binary answers < 8 bit
          tmpAnswer = sanitize(tmpAnswer);
        }

        // object to store the result
        var result = {
          q: $scope.currQuestion,
          t: $scope.questionType,
          a: tmpAnswer,
          c: "",
        };

        // check answer
        if (tmpAnswer === currAnswer.v) {
          result.p = $scope.currPoints;
        } else {
          result.p = 0;
          result.c = currAnswer.v;
        }

        $scope.history.push(result);
        genQuestion();
      };

      $scope.resetGame = function () {
        $scope.history = [];
        genQuestion();
      };
      $scope.getPoints = function () {
        var points = 0;
        $scope.history.forEach(function (i) {
          points += i.p;
        });
        return points;
      };
    }
])

.filter("reverse", function () {
  return function(list) {
    return list.slice().reverse();
  };
})
