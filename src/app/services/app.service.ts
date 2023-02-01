import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, LoadingController, NavController, Platform } from "@ionic/angular";
import { NativeHttpService } from './native-http.service';
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { Storage } from '@ionic/storage';
import { InAppBrowser } from "@awesome-cordova-plugins/in-app-browser/ngx";
import { map } from 'rxjs/operators';
import { IUser } from "./interfaces";
import { InAppBrowserOptions } from "@awesome-cordova-plugins/in-app-browser";

const path = environment.path;

const headers = new HttpHeaders();
//headers.append('Content-Type', 'text/plain');
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Authorization', 'Basic QVBLOj5HfUcvdzQ9VjZUcVN6Uw==');
// const options = new RequestOptions({ headers });

const options = { headers };

@Injectable({
    providedIn: 'root',
})
export class AppService {
    authState = new BehaviorSubject(false);
    onUsuarioChanged: BehaviorSubject<IUser>;
    isLoading = false;
    //@ts-ignore
    user: IUser;

    constructor(
        public http: HttpClient,
        public storage: Storage,
        public loadingController: LoadingController,
        public alertCtrl: AlertController,
        private platform: Platform,
        private nativeHttp: NativeHttpService,
        private iab: InAppBrowser,
        private navCtrl: NavController
    ) {
        // If using a custom driver:
        // await this.storage.defineDriver(MyCustomDriver)
        //@ts-ignore
        this.onUsuarioChanged = new BehaviorSubject(null);
        this.storage.create();
        this.platform.ready().then(() => {
            this.ifLoggedIn();
        });
    }
    /* STORAGE */
    setStorageUser(user: IUser) {
        this.storage.set('user', user);
        this.onUsuarioChanged.next(user);
        if (user?.email) {
            this.authState.next(true);
        } else {
            this.authState.next(false);
        }
    }
    getStorageUser() {
        return this.storage.get('user').then((res) => {
            this.onUsuarioChanged.next(res);
            if (!res) {
                res = [];
            }
            return res;
        });
    }
    ifLoggedIn() {
        this.storage.get('user').then((response) => {
            if (response && response.idUsuario) {
                this.onUsuarioChanged.next(response);
                this.authState.next(true);
            } else {
                this.authState.next(false);
            }
        });
    }
    // User
    isAuthenticated() {
        return this.authState.value;
    }
    login(user: IUser) {
        const url = `${path}/auth/login`;
        return this.nativeHttp.doPost(url, user).pipe(map((res) => res));
    }
    logout(user: IUser) {
        const url = `${path}/auth/logout`;
        return this.nativeHttp.doPost(url, user).pipe(map((res) => res));
    }
    registerUser(user: IUser) {
        const url = `${path}/auth/register`;
        return this.nativeHttp.doPost(url, user).pipe(map((res) => res));
    }

    requestPasswordReset(email: string) {
        const url = `${path}/auth/request-password-reset`;
        return this.nativeHttp.doPost(url, { email }).pipe(map((res) => res));
    }

    resetPassword(email: string, otp: string, password: string) {
        const url = `${path}/auth/password-reset`;
        return this.nativeHttp.doPost(url, { email, otp, password }).pipe(map((res) => res));
    }

    // URLs
    callEncrypt(uuid: string, user: string) {
        const url = `${environment.endpoints.encrypt}?uuid=${uuid}&user=${user}`;
        return this.nativeHttp.doGet(url);
    }

    getUakikaToken(nonce: string, user: string) {
        const url = `${environment.uakika.token}?nonce=${nonce}&user=${user}`;
        return this.nativeHttp.doGet(url);
    }

    getFactoRHToken(nonce: string, user: string) {
        const url = `${environment.factorh.token}?nonce=${nonce}&user=${user}`;
        return this.nativeHttp.doGet(url);
    }

    getFactoRHnotification(email:string){
     
        const url = `${environment.factorh.urlNotificaciones}/empleados/${email}/notificaciones_portal`
        console.log(url)
        return this.nativeHttp.doGetAut(url, {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, /,charset=utf-8',
            'Authorization': 'Basic aW50ZWdybzoxTjdHNDB3MiE=',
          })
    }

    redirect(link: string) {
        const options: InAppBrowserOptions = {
            hideurlbar: 'yes',
            hidenavigationbuttons: 'yes',
            toolbar: 'no',
            clearcache: 'yes',
            cleardata: "yes",
            fullscreen: "yes",
            clearsessioncache: 'no',
            location: 'no'
        };
        const browserUakika = this.iab.create(link, '_blank', options);
        // browser.insertCSS(...);
        // browserUakika.on('loadstop').subscribe(event => {
        //     console.log('event', event);
        //     browserUakika.insertCSS({ code: "body{color: red;" });
        // });
    }

    // Utils
    //@ts-ignore
    async presentAlert(tit, sms, btn) {
        const alert = await this.alertCtrl.create({
            header: tit,
            message: sms,
            buttons: [btn],
        });
        await alert.present();
    }
    async dismissSpinner() {
        this.isLoading = false;
        return await this.loadingController
            .dismiss()
            .then(() => console.log('dismissed'));
    }
    async presentSpinner() {
        this.isLoading = true;
        return await this.loadingController
            .create({
                message: 'Cargando',
                spinner: 'dots',
            })
            .then((a) => {
                a.present().then(() => {
                    if (!this.isLoading) {
                        a.dismiss().then(() => console.log('abort presenting'));
                    }
                });
            });
    }

    backButton() {
        this.navCtrl.back();
    }
}