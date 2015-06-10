/* global angular */

(function() {
'use strict';

angular
    .module('piggy.route', ['ngRoute', 'piggy.user', 'piggy.signin'])
    .config(routeConfig)
    .run(routeEvent);
    
routeConfig.$inject = ['$routeProvider'];
function routeConfig($routeProvider) {
    $routeProvider
    .when('/', {
        template: 'Home Page',
        resolve: { condition: isAuthenticated }
    })
    .when('/signin', {
        templateUrl: 'app/piggy.signin.template.html', 
        controller: 'signinController',
        controllerAs: 'ctrl',
        resolve: { condition: isNotAuthenticated }
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
    }, 2000);
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
    }, 2000);
    return deferred.promise;
}

// add isRouteLoading on rootScope for displaying loading page
routeEvent.$inject = ['$rootScope'];
function routeEvent($rootScope) {
    $rootScope.isRouteLoading = false;
    
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