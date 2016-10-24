"use strict";
var FlightCardController = (function () {
    function FlightCardController() {
    }
    FlightCardController.prototype.select = function () {
        this.selectedItem = this.item;
    };
    return FlightCardController;
}());
function createFlightCardDirective() {
    return {
        controller: FlightCardController,
        templateUrl: './flight-card.directive.html',
        transclude: true,
        bindToController: true,
        controllerAs: '$ctrl',
        scope: {
            item: '=',
            selectedItem: '='
        }
    };
}
exports.createFlightCardDirective = createFlightCardDirective;
//# sourceMappingURL=flight-card.directive.js.map