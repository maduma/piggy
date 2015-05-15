/* global describe, it, expect, beforeEach, module, inject */

(function() {
'use strict';

describe('User Module - Entity', function() {
    
    var user;
    
    beforeEach(module('piggy.user'));
    
    beforeEach(inject(function(userFactory) {
        user = userFactory;
    }));
    
    it('should exists a userFactory that provide a user', function() {
        expect(user).toBeDefined();
    });
    
    it('the user should have and uid attribute', function() {
        expect(user.uid).toBeDefined();
    });
    
    it('the user should have and isAuthenticated attribute', function() {
        expect(user.isAuthenticated).toBeDefined();
    });
    
});


})();