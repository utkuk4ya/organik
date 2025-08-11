import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DashPage } from './dash.page';
import { DashPageRoutingModule } from './dash-routing.module';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashPageRoutingModule,
    RouterModule,
    NgxChartsModule
  ],
  declarations: [DashPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // CUSTOM_ELEMENTS_SCHEMA eklendi
})
export class DashModule {}
