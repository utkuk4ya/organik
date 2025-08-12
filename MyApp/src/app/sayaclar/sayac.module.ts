import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SayacPageRoutingModule } from './sayac-routing.module';
import { SayacPage } from './sayac.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SayacPageRoutingModule
  ],
  declarations: [SayacPage]
})
export class SayacPageModule {}