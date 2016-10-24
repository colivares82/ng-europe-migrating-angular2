"use strict";
var angular = require('angular');
var tabs_component_1 = require("./tabs.component");
var tabs_component_2 = require("./tabs.component");
var tabs = angular.module('tabs', []);
tabs.component('tab', tabs_component_1.tabComponentDesc);
tabs.component('tabs', tabs_component_2.tabsComponentDesc);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = tabs.name;
//# sourceMappingURL=tabs.module.js.map