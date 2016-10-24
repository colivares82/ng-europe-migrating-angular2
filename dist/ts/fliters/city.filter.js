/**
 * Created by steyer on 11.07.2016.
 */
"use strict";
function createCityFilter($http) {
    var filter = function (city, fmt) {
        var short;
        var long;
        switch (city) {
            case "Hamburg":
                short = "HAM";
                long = "Hamburg Airport Helmut Schmidt";
                break;
            case "Graz":
                short = "GRZ";
                long = "Flughafen Graz Thalerhof";
                break;
            default:
                short = long = "ROM";
        }
        if (fmt == 'short')
            return short;
        return long;
    };
    // filter.$stateful = true;
    return filter;
}
exports.createCityFilter = createCityFilter;
//# sourceMappingURL=city.filter.js.map