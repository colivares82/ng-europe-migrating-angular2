"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * Created by colivares on 10/24/16.
 */
var flight_service_1 = require('../services/flight.service');
var core_1 = require('@angular/core');
var MigratedFlightEditComponent = (function () {
    function MigratedFlightEditComponent(flightService) {
        var _this = this;
        this.flightService = flightService;
        this.flight = {};
        this.info = 'Flight Edit';
        this.flightService
            .getById(this.id)
            .then(function (flight) {
            _this.flight = flight;
            _this.message = "";
        })
            .catch(function (resp) {
            console.error(resp);
            _this.message = resp.data;
        });
    }
    MigratedFlightEditComponent.prototype.save = function () {
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MigratedFlightEditComponent.prototype, "id", void 0);
    MigratedFlightEditComponent = __decorate([
        core_1.Component({
            selector: 'flight-edit',
            templateUrl: './migrated-flight-edit.component.html'
        }),
        __param(0, core_1.Inject('flightService')), 
        __metadata('design:paramtypes', [flight_service_1.FlightService])
    ], MigratedFlightEditComponent);
    return MigratedFlightEditComponent;
}());
exports.MigratedFlightEditComponent = MigratedFlightEditComponent;
//# sourceMappingURL=migrated-flight-edit.component.js.map