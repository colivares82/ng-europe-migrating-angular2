"use strict";
var FlightEditController = (function () {
    function FlightEditController($stateParams, flightService) {
        var _this = this;
        this.flightService = flightService;
        this.info = 'Flight Edit';
        this.flight = {};
        this.id = $stateParams.id;
        this.flightService
            .getById(this.id)
            .then(function (flight) {
            _this.flight = flight;
            _this.message = '';
        })
            .catch(function (resp) {
            console.error(resp);
            _this.message = resp.data;
        });
    }
    FlightEditController.prototype.save = function () {
        var _this = this;
        this.flightService
            .save(this.flight)
            .then(function (flight) {
            _this.flight = flight;
            _this.message = '';
        })
            .catch(function (resp) {
            console.error(resp);
            _this.message = resp.data;
        });
    };
    return FlightEditController;
}());
exports.FlightEditComponent = {
    controller: FlightEditController,
    template: require('./flight-edit.component.html')
};
//# sourceMappingURL=flight-edit.component.js.map