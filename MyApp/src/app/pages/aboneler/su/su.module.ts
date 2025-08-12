import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuPageRoutingModule } from './su-routing.module';

import { SuPage } from './su.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuPageRoutingModule
  ],
  declarations: [SuPage]
})
export class SuPageModule {}
