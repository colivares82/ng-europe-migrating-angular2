"use strict";
var PassengerSearchController = (function () {
    function PassengerSearchController(passengerService) {
        this.passengerService = passengerService;
        this.name = 'Doe';
        this.passenger = [];
    }
    PassengerSearchController.prototype.search = function () {
        var _this = this;
        this
            .passengerService
            .find(this.name)
            .then(function (passenger) {
            _this.passenger = passenger;
        })
            .catch(function (err) {
            console.error(err);
        });
    };
    return PassengerSearchController;
}());
exports.PassengerSearchComponent = {
    controller: PassengerSearchController,
    template: require('./passenger-search.component.html')
};
//# sourceMappingURL=passenger-search.component.js.map