"use strict";
var ShoppingCardController = (function () {
    function ShoppingCardController(bookingEventService) {
        var _this = this;
        bookingEventService.subscribe(function (f) {
            _this.flight = f;
        });
    }
    return ShoppingCardController;
}());
exports.ShoppingCardComponent = {
    controller: ShoppingCardController,
    template: "\n        <div class='panel panel-default'>\n\n          <div class='panel-heading'>Your Shopping Basket</div>\n\n            <ul class='list-group' ng-if='$ctrl.flight'>\n\n                <li class='list-group-item'>\n                    #{{$ctrl.flight.id}}, {{$ctrl.flight.from}} - {{$ctrl.flight.to}}\n                </li>\n            </ul>\n\n            <ul class='list-group' ng-if='!$ctrl.flight'>\n\n                <li class='list-group-item'>\n                    Your basket is empty. Select a flight.\n                </li>\n            </ul>\n\n\n          </div>\n        </div>\n    "
};
//# sourceMappingURL=shopping-card.component.js.map