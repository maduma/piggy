/* global angular */

(function() {
'use strict';

angular
    .module('piggy.pageloading', [])
    .run(loadingPage);
    
// add isRouteLoading on rootScope for displaying loading page
loadingPage.$inject = ['$rootScope'];
function loadingPage($rootScope) {
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