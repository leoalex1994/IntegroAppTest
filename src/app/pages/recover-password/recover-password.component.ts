import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent {
  sent = false;
  passwordType = 'password';
  email = '';

  constructor(private service: AppService) { }
  //@ts-ignore
  requestPasswordReset(form) {
    if (!this.sent) {
      const email = form.email;
      this.requestOTP(email)
    } else {
      this.changePass(form);
    }
  }

  requestOTP(email: string): void {
    this.service.requestPasswordReset(email).subscribe(res => {
      if (res.data.error) {
        this.service.presentAlert('Mensaje', 'Lo sentimos ha ocurrido un error, vuelva a intentar', 'Aceptar');
      } else {
        if (res.data.data.sent) {
          this.service.presentAlert('Mensaje', 'Solicitud de cambio de contraseña exitosa, por favor revisa tu bandeja de correos', 'Aceptar');
          this.sent = true;
          this.email = email;
        } else {
          this.service.presentAlert('Mensaje', 'Correo invalido, vuelva a intentar', 'Aceptar');
        }
      }
    })
  }

  //@ts-ignore
  changePass(form) {
    if (form.password === form.passwordRepeat) {
      this.service.resetPassword(this.email, String(form.otp), form.password).subscribe(res => {
        if (res.data.error) {
          this.service.presentAlert('Mensaje', 'Código de verificación invalido, vuelva a intentar', 'Aceptar');
        } else {
          this.service.presentAlert('Mensaje', 'Contraseña correctamente cambiada, vuelva a ingresar', 'Aceptar');
          this.service.backButton();
        }
        console.log('res', res);
      });
    } else {
      this.service.presentAlert('Mensaje', 'Las contraseñas no coinciden, vuelva a intentar', 'Aceptar');
    }
  }

  togglePasswordMode() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
  }

}
