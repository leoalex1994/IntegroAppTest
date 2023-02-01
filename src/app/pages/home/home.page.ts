import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { IUser } from 'src/app/services/interfaces';
import { environment } from 'src/environments/environment';
import { AppService } from '../../services/app.service';
import * as uuid from 'uuid';
import { timeout } from 'rxjs/operators';
const env = environment;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  //@ts-ignore
  user: IUser;
  showForm = false;
  //@ts-ignore
  ct: string;
  logo = 'assets/logos/ubits.jpeg';
  passwordType = 'password';
  color = 'color';
  integro: string;
  today = new Date();
  //@ts-ignore
  app: string;
  uakika = env.uakika.url;
  //@ts-ignore
  cu: string;
  isAdmin = false;
  ubitsClass = "ubits-image";
  notifyCount=0;
  notifyArray=[]
  constructor(private platform: Platform, private service: AppService, public navCtrl: NavController) {
    if (this.today.getHours() >= 16 && this.today.getHours() < 6) {
      this.integro = 'assets/logos/integroWhite.png'
    } else {
      this.integro = 'assets/logos/integro.png'
    }
  }
  async ngOnInit() {
    await this.refreshUser();
    this.notifyCount=this.notifyArray.length
  }
  refreshUser() {
    //@ts-ignore
    this.service.getStorageUser().then((userData) => {
      if (userData?.email) {
        this.user = userData;
        this.getNotificaciones(this.user.email)
        this.isAdmin = this.user.role === 'admin';
      } else {
        this.navCtrl.navigateRoot('login');
      }
    });
  }
  changeImages() {
    let TIME_IN_MS = 5000;
    let hideFooterTimeout = setTimeout(() => {
      this.ubitsClass = "ubits-image2";
    }, TIME_IN_MS);
  }
  selectApp(app: string) {
    this.app = app;
    this.showForm = false;
    switch (app) {
      case 'ubits':
        this.loginUbits();
        break;
      case 'uakika':
        this.loginUakika();
        break;
      case 'factorh':
        this.loginFactoRH();
        break;
      case 'hrider':
        window.open('https://outlook.office.com/', '_system', 'location=yes');
        //this.navCtrl.navigateForward('https://outlook.office.com/');
       // this.service.presentAlert('Mensaje', 'Lo sentimos esta opción no se encuentra disponible', 'Aceptar');
        break;
      default:
        this.showForm = false;
        break;
    }
  }
  togglePasswordMode() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
  }
  login() {
    this.service.redirect(env.hrider.url);
  }

  loginUbits() {
    
    const uuid = environment.ubits.uuid;
    this.service.callEncrypt(uuid, this.user.email).subscribe(res => {
      //@ts-ignore
      if (res.data?.status) {
        //@ts-ignore
        const url = String(res.data.url);
        this.service.redirect(url);
      }
    });
  }

  loginUakika() {
    const nonce = uuid.v4();
    this.service.getUakikaToken(nonce, this.user.email).subscribe(res => {
      //@ts-ignore
      if (res.status === 200) {
        //@ts-ignore
        const token = String(res.data);
        const url = `${environment.uakika.url}?token=${token}&username=${this.user.email}&nonce=${nonce}`;
        this.service.redirect(url);
      } else {
        this.service.presentAlert('Mensaje', 'Ha ocurrido un error al generar tu sesión, por favor contacta al administrador', 'Aceptar');
      }
    });
  }
  loginFactoRH() {
    const nonce = uuid.v4();
    this.service.getFactoRHToken(nonce, this.user.email).subscribe(res => {
      //@ts-ignore
      if (res.status === 200) {
        //@ts-ignore
        const token = String(res.data);
        const url = `${environment.factorh.url}?token=${token}&user=${this.user.email}&nonce=${nonce}`;
        this.service.redirect(url);
      } else {
        this.service.presentAlert('Mensaje', 'Ha ocurrido un error al generar tu sesión, por favor contacta al administrador', 'Aceptar');
      }
    });
  }
  backButton() {
    this.showForm = false;
    this.color = 'color';
  }
  vernitificaciones(){
    this.navCtrl.navigateForward('/notifications/'+JSON.stringify(this.notifyArray));
  }
  //@ts-ignore
  getNotificaciones(email){
    this.service.getFactoRHnotification(email).subscribe(res => {
      //@ts-ignore
      if (res.status === 200) {
        //@ts-ignore
      this.notifyArray=res.data.data
      //@ts-ignore
      this.notifyCount=res.data.total_results
      } else {
        this.service.presentAlert('Mensaje', 'Ha ocurrido un error al generar tu sesión, por favor contacta al administrador', 'Aceptar');
      }
    });

    
  }
  closeSession() {
    this.service.logout(this.user);
    //@ts-ignore
    this.service.setStorageUser(null);
    this.navCtrl.navigateRoot('login')
  }
}
