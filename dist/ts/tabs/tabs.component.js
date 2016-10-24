"use strict";
var TabsController = (function () {
    function TabsController() {
        this.tabs = [];
    }
    TabsController.prototype.register = function (tab) {
        this.tabs.push(tab);
    };
    TabsController.prototype.activate = function (active) {
        for (var _i = 0, _a = this.tabs; _i < _a.length; _i++) {
            var tab = _a[_i];
            tab.visible = (tab == active);
        }
    };
    TabsController.prototype.$postLink = function () {
        if (this.tabs.length == 0)
            return;
        this.activate(this.tabs[0]);
    };
    return TabsController;
}());
exports.tabsComponentDesc = {
    controller: TabsController,
    transclude: true,
    template: "\n\n        <div style=\"background-color:lightblue; padding:20px;\">\n            <span ng-repeat=\"tab in $ctrl.tabs\" style=\"padding-right:20px;\">\n                <a style=\"cursor:pointer\" ng-click=\"$ctrl.activate(tab)\">{{tab.title}}</a>\n            </span>\n\n            <ng-transclude></ng-transclude>\n        </div>\n    "
};
var TabController = (function () {
    function TabController() {
        this.visible = false;
    }
    TabController.prototype.$onInit = function () {
        this.tabs.register(this);
    };
    return TabController;
}());
exports.tabComponentDesc = {
    controller: TabController,
    require: {
        tabs: '^tabs'
    },
    bindings: {
        title: '@'
    },
    transclude: true,
    template: "\n        <div ng-if=\"$ctrl.visible\">\n            <h2>{{$ctrl.title}}</h2>\n            <ng-transclude></ng-transclude>\n        </div>\n    "
};
//# sourceMappingURL=tabs.component.js.map