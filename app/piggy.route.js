/* global angular */

(function() {
'use strict';

angular
    .module('piggy.route', ['ngRoute', 'piggy.pageloading',
    'piggy.user', 'piggy.signin', 'piggy.bank', 'piggy.page.digicode',
    'piggy.page.setdigicode', 'piggy.page.home'])
    .config(routeConfig);
    
routeConfig.$inject = ['$routeProvider'];
function routeConfig($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'app/piggy.home.template.html', 
        controller: 'homeController',
        controllerAs: 'ctrl',
        resolve: {condition: isAuthenticated}
    })
    .when('/signin', {
        templateUrl: 'app/piggy.signin.template.html', 
        controller: 'signinController',
        controllerAs: 'ctrl',
        resolve: {condition: isNotAuthenticated}
    })
    .when('/setdigicode', {
        templateUrl: 'app/piggy.setdigicode.template.html', 
        controller: 'setDigicodeController',
        controllerAs: 'ctrl',
        resolve: {condition: isAuthenticated}
    })
    .when('/digicode', {
        templateUrl: 'app/piggy.digicode.template.html',
        controller: 'digicodeController',
        controllerAs: 'ctrl',
        resolve: {condition: isAuthenticated}
    })
    .otherwise({
        redirectTo: '/'
    });
}
    
isAuthenticated.$inject = ['$q', '$timeout', '$location', 'userFactory'];
function isAuthenticated($q, $timeout, $location, user) {
    var deferred = $q.defer();
    $timeout(function() {
        if (user.isAuthenticated) {
            deferred.resolve(true);
        } else {
            deferred.reject();
            $location.path('/signin');
        } 
    }, 1000);
    return deferred.promise;
}

isNotAuthenticated.$inject = ['$q', '$timeout', '$location', 'userFactory'];
function isNotAuthenticated($q, $timeout, $location, user) {
    var deferred = $q.defer();
    $timeout(function() {
        if (!user.isAuthenticated) {
            deferred.resolve(true);
        } else {
            deferred.reject();
            $location.path('/');
        } 
    }, 1000);
    return deferred.promise;
}

isReadWrite.$inject = ['$q', '$timeout', '$location', 'bankFactory'];
function isReadWrite($q, $timeout, $location, bank) {
    var targetPath = $location.path();
    var deferred = $q.defer();
    $timeout(function() {
        if (!bank.isLocked || bank.isInitalCode) {
            deferred.resolve(true);
        } else {
            deferred.reject();
            $location.path('/digicode').search({caller: targetPath});
        }
    }, 1000);
    return deferred.promise;
}

})();