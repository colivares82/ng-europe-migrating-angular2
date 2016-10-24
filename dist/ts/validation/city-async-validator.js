"use strict";
function createCityAsyncValidatorDDO($q) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$asyncValidators.cityAsync = function (value) {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        resolve();
                    }, 500);
                });
            };
        }
    };
}
exports.createCityAsyncValidatorDDO = createCityAsyncValidatorDDO;
//# sourceMappingURL=city-async-validator.js.map