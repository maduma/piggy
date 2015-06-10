/* global angular */

(function() {
'use strict';

angular
    .module('piggy.route', ['ngRoute', 'piggy.user', 'piggy.signin', 'piggy.bank'])
    .config(routeConfig)
    .run(routeEvent);
    
routeConfig.$inject = ['$routeProvider'];
function routeConfig($routeProvider) {
    $routeProvider
    .when('/', {
        template: 'Home Page <a href="/#/setdigicode">set digicode</a>',
        resolve: {condition: isAuthenticated}
    })
    .when('/signin', {
        templateUrl: 'app/piggy.signin.template.html', 
        controller: 'signinController',
        controllerAs: 'ctrl',
        resolve: {condition: isNotAuthenticated}
    })
    .when('/setdigicode', {
        template: 'set digicode',
        resolve: {
            condition1: isAuthenticated,
            condition2: isReadWrite
        }
    })
    .when('/digicode', {
        template: 'digicode',
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
    var deferred = $q.defer();
    $timeout(function() {
        if (!bank.isLocked || bank.isInitalCode) {
            deferred.resolve(true);
        } else {
            deferred.reject();
            $location.path('/digicode');
        }
    }, 1000);
    return deferred.promise;
}

// add isRouteLoading on rootScope for displaying loading page
routeEvent.$inject = ['$rootScope', 'userFactory', 'bankFactory'];
function routeEvent($rootScope, user, bank) {
    $rootScope.isRouteLoading = false;
    $rootScope.user = user;
    $rootScope.bank = bank;
    
    $rootScope.$on('$routeChangeStart', function(event, route) {
        //console.log('$routeChangeStart', event, route);
        $rootScope.isRouteLoading = true;
    });
    
    $rootScope.$on('$routeChangeSuccess', function(event, route) {
        //console.log('$routeChangeSuccess', event, route);
        $rootScope.isRouteLoading = false;
    });
    
    $rootScope.$on('$routeChangeError', function(event, route) {
        //console.log('$routeChangeError', event, route);
        $rootScope.isRouteLoading = false;
    });
    
    $rootScope.$on('$routeUpdate', function(event, route, a) {
        //console.log('$routeUpdate', event, route, a);
    });
}

})();