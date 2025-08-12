import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AbonelerPageRoutingModule } from './aboneler-routing.module';

import { AbonelerPage } from './aboneler.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AbonelerPageRoutingModule
    ],
    declarations: [AbonelerPage]
})
export class AbonelerPageModule { }
