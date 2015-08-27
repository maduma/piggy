/* global angular _ */

(function() {
'use strict';

var names = ['Julie', 'Cléo', 'Hugo', 'Noa', 'Fred', 'Angie', 'Louise'];
var type = ['Heart', 'Kiss', 'Euro', 'Dollard', 'up', 'Down'];

angular
    .module('piggy.page.home', ['piggy.bank'])
    .controller('homeController', homeController);
    
homeController.$inject = ['bankFactory'];    
function homeController(bank) {
    var self = this;
    this.bank = bank;
    this.addBox = function() {
        self.bank.boxes.push({
            owner: _.shuffle(names)[0],
            amount: 0,
            image: '',
            type: _.shuffle(type)[0]
        });
    };
    this.remove = function(index) {
        console.log(index);
        self.bank.boxes.splice(index, 1);
    }
}

})();