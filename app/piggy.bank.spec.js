/* global describe, it, expect, beforeEach, module, inject, timeout */

(function() {
'use strict';

describe('Bank Module - Entity', function() {
    
    var bank;
    
    beforeEach(module('piggy.bank'));
    
    beforeEach(inject(function(bankFactory) {
        bank = bankFactory;
    }));
    
    it('should exists a bankFactory that provide a bank', function() {
        expect(bank).toBeDefined();
    });
    
    it('the bank should be locked', function() {
        expect(bank.isLocked).toBeTruthy();
    });
    
    it('the bank may be unlocked', function() {
        var password = 'password';
        bank.unLock(password);
        expect(bank.isLocked).toBeFalsy();
    });
    
    it('the bank cannot be unLock with a bad secret', function() {
        var password = 'bad';
        bank.unLock(password);
        expect(bank.isLocked).toBeTruthy();
    });
    
    it('is possible to change the secret knowing the old one', function() {
        var password = 'password';
        var newPassword = 'newpassword';
        bank.changeSecret(password, newPassword);
        bank.unLock(newPassword);
        expect(bank.isLocked).toBeFalsy();
    });
    
    it('is not possible to change the secret not knowing the old one', function() {
        var password = 'bad';
        var newPassword = 'newpassword';
        bank.changeSecret(password, newPassword);
        bank.unLock(newPassword);
        expect(bank.isLocked).toBeTruthy();
    });
    
    it('is possible to lock back the bank', function() {
        var password = 'password';
        bank.unLock(password);
        expect(bank.isLocked).toBeFalsy();
        bank.lock();
        expect(bank.isLocked).toBeTruthy();
    });
    
    it('the bank should auto-lock after a timeout', function() {
        var password = 'password';
        bank.unLock(password);
        expect(bank.isLocked).toBeFalsy();
        inject(function($timeout) {
            $timeout.flush();
            expect(bank.isLocked).toBeTruthy();
        });
    });
    
    describe('StrongBox', function() {
        it('should contains a least one box', function() {
            expect(bank.boxes.length).toBeGreaterThan(0);
            
        });
    });
    
});


})();