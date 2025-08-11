import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // FormsModule ve ReactiveFormsModule import edilmiştir
import { IonicModule } from '@ionic/angular';
import { NewCariModalComponent } from './new-cari-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // ReactiveFormsModule eklenmiş
    IonicModule
  ],
  declarations: [NewCariModalComponent]
  
})
export class NewCariModalModule {}
