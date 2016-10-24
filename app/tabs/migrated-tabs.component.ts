import * as angular from 'angular';

import { Component, AfterContentInit, OnInit, Input} from '@angular/core';

@Component({
    selector: 'tabs',
    template: `
        <div style="background-color:lightblue; padding:20px;">
            <span *ngFor="let tab of tabs" style="padding-right:20px;">
                <a style="cursor:pointer" (click)="activate(tab)">{{tab.title}}</a>
            </span>

            <ng-content></ng-content>
        </div>

    `
})
export class MigratedTabsComponent implements AfterContentInit {

    private tabs: Array<MigratedTabComponent> = [];

    public register(tab: MigratedTabComponent) {
        this.tabs.push(tab);
    }

    public activate(active: MigratedTabComponent) {
        for(let tab of this.tabs) {
            tab.visible = (tab == active);
        }
    }

    ngAfterContentInit() {
        if (this.tabs.length == 0) return;
        this.activate(this.tabs[0]);
    }

}

@Component({
    selector: 'tab',
    template: `
        <div *ngIf="visible">
            <h2>{{title}}</h2>
            <ng-content></ng-content>
        </div>
    `
})
export class MigratedTabComponent implements OnInit {
    public visible: boolean = false;
    @Input() public title: string;

    constructor(public tabs: MigratedTabsComponent) {
    }

    ngOnInit() {
        this.tabs.register(this);
    }
}
