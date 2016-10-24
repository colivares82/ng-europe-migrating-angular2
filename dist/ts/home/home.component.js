"use strict";
var HomeController = (function () {
    function HomeController() {
        this.info = 'Welcome!';
    }
    return HomeController;
}());
exports.HomeComponent = {
    controller: HomeController,
    template: "\n        <h1>{{$ctrl.info}}</h1>\n    "
};
//# sourceMappingURL=home.component.js.map