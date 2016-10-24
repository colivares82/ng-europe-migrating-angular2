"use strict";
var PassengerService = (function () {
    function PassengerService($http) {
        this.$http = $http;
    }
    PassengerService.prototype.find = function (name) {
        var url = 'http://www.angular.at/api/passenger';
        var urlParams = { name: name };
        return this
            .$http
            .get(url, { params: urlParams })
            .then(function (resp) { return resp.data; });
    };
    return PassengerService;
}());
exports.PassengerService = PassengerService;
//# sourceMappingURL=passenger.service.js.map