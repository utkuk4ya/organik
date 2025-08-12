import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GazPageRoutingModule } from './gaz-routing.module';

import { GazPage } from './gaz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GazPageRoutingModule
  ],
  declarations: [GazPage]
})
export class GazPageModule {}
