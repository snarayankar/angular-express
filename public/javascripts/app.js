/**
 * Created by snarayankar on 2/13/2018.
 */
var app = angular.module('sansExpressApp',[]);

app.controller('myController', function($scope, $http) {
    $scope.data = [];
    $scope.phoneValidatorRegex = /^\+?\d{3}[- ]?\d{3}[- ]?\d{1,4}$/;
    $scope.invokeComboGenerator = invokeComboGenerator;

    // This is a REST call
    function getDataFromSpring(phoneNumber) {
        $http({
            url: 'http://localhost:8080/letterCombo/' + phoneNumber,
            phoneNumber: '@phoneNumber',
            method: 'GET',
            headers: {'Accept': 'application/json'}
        }).then(function (response) {
            $scope.listOfCombinationsSpring = response.data;
        });
    }

    function invokeComboGenerator(phoneNumber) {
        var tmpCharArray = [];
        var charMap = [];
        charMap[2]="ABC";
        charMap[3]="DEF";
        charMap[4]="GHI";
        charMap[5]="JKL";
        charMap[6]="MNO";
        charMap[7]="PQRS";
        charMap[8]="TUV";
        charMap[9]="WXYS";
        charMap[0]="OPER";

        $scope.listOfCombinationsSpring = [];
        $scope.listOfCombinationsJS = [];

        if(phoneNumber == null || phoneNumber.length == 0) {
            return;
        } else {
            phoneNumberToGenerateCombos = phoneNumber.replace(/\D/g, "");
            if (phoneNumberToGenerateCombos.length == 7 || phoneNumberToGenerateCombos.length == 10) {
                getDataFromSpring(phoneNumberToGenerateCombos);
                getCombinationsFromJS(phoneNumberToGenerateCombos, tmpCharArray, charMap);
            }
        }
    }

    // This is a JS method
    function getCombinationsFromJS(phoneNumber, tmpCharArray, charMap){
        var lengthOfPhoneNumber = phoneNumber.length;
        var digitToMap = parseInt(phoneNumber.substring(lengthOfPhoneNumber-1,lengthOfPhoneNumber));
        var matchingChar = charMap[digitToMap];
        if(angular.isDefined(matchingChar) && matchingChar.length > 0 ) {
            for (var i = 0; i < matchingChar.length; i++) {
                tmpCharArray.push(matchingChar.charAt(i));
                $scope.listOfCombinationsJS.push(phoneNumber.substring(0,lengthOfPhoneNumber-1) + matchingChar.charAt(i));
                tmpCharArray.pop();
            }
        }
    }
});