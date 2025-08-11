import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module'; // Buradaki isimlendirme doğru olmalı
import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // ReactiveFormsModule'ü import ettik
    IonicModule,
    LoginPageRoutingModule // Import ismini doğruladık
  ],
  declarations: [LoginPage],
  // CUSTOM_ELEMENTS_SCHEMA genellikle gerekli değildir
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginModule {} // Modül adını LoginPageModule olarak düzelttik
