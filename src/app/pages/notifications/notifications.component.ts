import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import * as uuid from 'uuid';
import { environment } from 'src/environments/environment';
import { AppService } from '../../services/app.service';
import { IUser } from 'src/app/services/interfaces';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notifyArray=[]
  showForm = false;
  //@ts-ignore
  app: string;
  //@ts-ignore
  user: IUser;
  constructor(private route: ActivatedRoute,private service:AppService,public navCtrl: NavController) { }
  ngOnInit() {
    this.refreshUser()
    let id = this.route.snapshot.paramMap.get('data');
    //@ts-ignore
    this.notifyArray=JSON.parse(id)
  }

  selectApp(app: string) {
    this.app = app;
    this.showForm = false;
    switch (app) {
      case 'factorh':
        this.loginFactoRH();
        break;
      default:
        this.showForm = false;
        break;
    }
  }
  refreshUser() {
    this.service.getStorageUser().then((userData) => {
      if (userData?.email) {
        this.user = userData;
      } else {
        this.navCtrl.navigateRoot('login');
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

}
