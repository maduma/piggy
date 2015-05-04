/* global describe, it, expect, beforeEach, angular, module, inject */

(function() {
'use strict';

describe('Authentification Module', function() {
    
    it('should exists a piggy.auth module', function() {
        var _module = angular.module('piggy.auth');
        console.log(_module);
        expect(_module).toBeDefined();
    });
    
});

describe('Authentification Factory', function() {
    var _factory;
    
    beforeEach(module('piggy.auth'));
    
    beforeEach(inject(function(_authFactory_) {
        _factory = _authFactory_;
    }));
    
    it('should exists an authFactory in piggy.auth module', function() {
        expect(_factory).toBeDefined();
    });
    
    describe('listAuthModules', function() {
        
        it('should return a list', function() {
            var result = _factory.listAuthModules();
            expect(result.length).toBeGreaterThan(1);
        });
        
    });
    
    
});

})();