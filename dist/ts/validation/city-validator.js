"use strict";
function createCityValidatorDDO() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elm, attrs, ngModel) {
            ngModel.$validators.city2 = function (value) {
                switch (value) {
                    case 'Graz':
                    case 'Hamburg':
                    case 'Frankfurt':
                        return true;
                }
                return false;
            };
        }
    };
}
exports.createCityValidatorDDO = createCityValidatorDDO;
//# sourceMappingURL=city-validator.js.map