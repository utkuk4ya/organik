import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  passwordType = 'password';
  passwordLengthError = false;


  constructor(
    private alertController: AlertController,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.maxLength(12)]), // Şifre uzunluğunu sınırla
    });
  }

  checkPasswordLength() {
    const passwordControl = this.loginForm.get('password');
    if (passwordControl && passwordControl.value.length > 12) {
      this.passwordLengthError = true;
    } else {
      this.passwordLengthError = false;
    }
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  async onLogin() {
    if (this.loginForm.valid) {
      console.log('Form geçerli, giriş yapılıyor...');
      this.goToDash();
    } else {
      const alert = await this.alertController.create({
        header: 'Uyarı',
        message: 'Lütfen kullanıcı adı ve şifre giriniz.',
        buttons: ['Tamam']
      });
      alert.present();
    }
  }

  goToDash() {
    this.router.navigate(['/dash']);
  }
}
