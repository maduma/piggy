/* global angular */

(function() {
'use strict';

angular
    .module('piggy.route', ['ngRoute', 'piggy.user', 'piggy.signin'])
    .config(routeConfig)
    .run(routeEvent);
    
routeConfig.$inject = ['$routeProvider'];
//, '$q', '$timeout', '$location', 'userFactory'
    
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
        template: 'Route Error'
    });
}
    
isAuthenticated.$inject = ['$q', '$timeout', '$location', 'userFactory'];
function isAuthenticated($q, $timeout, $location, user) {
    console.log('toto 1');
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
    console.log('toto 2');
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
    
    $rootScope.$on('$routeChangeStart', function() {
        console.log('$routeChangeStart');
        $rootScope.isRouteLoading = true;
    });
    
    $rootScope.$on('$routeChangeSuccess', function() {
        console.log('$routeChangeSuccess');
        $rootScope.isRouteLoading = false;
    });
    
    $rootScope.$on('$routeChangeError', function(a, b, c, d) {
        console.log('$routeChangeError', a, b, c, d);
        $rootScope.isRouteLoading = false;
    });
    
    $rootScope.$on('$routeUpdate', function() {
        console.log('$routeUpdate');
    });
}

})();