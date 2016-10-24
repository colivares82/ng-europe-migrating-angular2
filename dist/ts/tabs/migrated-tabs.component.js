"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var MigratedTabsComponent = (function () {
    function MigratedTabsComponent() {
        this.tabs = [];
    }
    MigratedTabsComponent.prototype.register = function (tab) {
        this.tabs.push(tab);
    };
    MigratedTabsComponent.prototype.activate = function (active) {
        for (var _i = 0, _a = this.tabs; _i < _a.length; _i++) {
            var tab = _a[_i];
            tab.visible = (tab == active);
        }
    };
    MigratedTabsComponent.prototype.ngAfterContentInit = function () {
        if (this.tabs.length == 0)
            return;
        this.activate(this.tabs[0]);
    };
    MigratedTabsComponent = __decorate([
        core_1.Component({
            selector: 'tabs',
            template: "\n        <div style=\"background-color:lightblue; padding:20px;\">\n            <span *ngFor=\"let tab of tabs\" style=\"padding-right:20px;\">\n                <a style=\"cursor:pointer\" (click)=\"activate(tab)\">{{tab.title}}</a>\n            </span>\n\n            <ng-content></ng-content>\n        </div>\n\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], MigratedTabsComponent);
    return MigratedTabsComponent;
}());
exports.MigratedTabsComponent = MigratedTabsComponent;
var MigratedTabComponent = (function () {
    function MigratedTabComponent(tabs) {
        this.tabs = tabs;
        this.visible = false;
    }
    MigratedTabComponent.prototype.ngOnInit = function () {
        this.tabs.register(this);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MigratedTabComponent.prototype, "title", void 0);
    MigratedTabComponent = __decorate([
        core_1.Component({
            selector: 'tab',
            template: "\n        <div *ngIf=\"visible\">\n            <h2>{{title}}</h2>\n            <ng-content></ng-content>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [MigratedTabsComponent])
    ], MigratedTabComponent);
    return MigratedTabComponent;
}());
exports.MigratedTabComponent = MigratedTabComponent;
//# sourceMappingURL=migrated-tabs.component.js.map