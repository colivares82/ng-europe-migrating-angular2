"use strict";
exports.PassengerCardComponent = {
    templateUrl: './passenger-card.component.html',
    controllerAs: 'vm',
    bindings: {
        item: '<',
        selectedItem: '<',
        selectedItemChange: '&'
    },
    controller: function () {
        var _this = this;
        this.select = function () {
            _this.selectedItem = _this.item;
            _this.selectedItemChange(_this.item);
        };
    }
};
//# sourceMappingURL=passenger-card.component.js.map