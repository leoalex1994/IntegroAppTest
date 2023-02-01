import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { IUser } from 'src/app/services/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private service: AppService, private navCtrl: NavController) { }

  ngOnInit() { }

  login(user: IUser) {
    this.service.presentSpinner();
    console.log('user', user);
    this.service.login(user).subscribe(res => {
      this.service.dismissSpinner();
      //@ts-ignore
      const data = res.data.data;
      if (data?.user) {
        const user = data.user;
        user.token = data.token;
        this.service.user = user;
        this.service.setStorageUser(user);
        this.navCtrl.navigateRoot('/home', { replaceUrl: true });
      } else {
        this.service.presentAlert('Mensaje', 'Credenciales invalidas, por favor intente de nuevo', 'Aceptar');
      }

    }, error => {
      this.service.dismissSpinner();
      this.service.presentAlert('Mensaje', 'Ha ocurrido un error, por favor intente de nuevo', 'Aceptar');
      console.log('error', error);
    });
  }
}
