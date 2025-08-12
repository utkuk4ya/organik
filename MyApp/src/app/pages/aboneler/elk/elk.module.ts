import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElkPageRoutingModule } from './elk-routing.module';

import { ElkPage } from './elk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElkPageRoutingModule
  ],
  declarations: [ElkPage]
})
export class ElkPageModule {}
