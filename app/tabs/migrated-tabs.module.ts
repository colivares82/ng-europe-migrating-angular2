/**
 * Created by colivares on 10/24/16.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MigratedTabComponent, MigratedTabsComponent} from "./migrated-tabs.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MigratedTabsComponent,
        MigratedTabComponent
    ],
    exports: [
        MigratedTabsComponent,
        MigratedTabComponent
    ]
})
export class MigratedTabsModule {
}
