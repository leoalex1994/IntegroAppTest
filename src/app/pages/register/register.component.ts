import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { AppService } from "src/app/services/app.service";
import { IUser } from "src/app/services/interfaces";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  passwordType = "password";
  // logo = 'assets/images/app-pngArtboard14.png'
  logo = "assets/icon/avatar.png";
  constructor(private service: AppService, private navCtrl: NavController) {}

  ngOnInit() {}

  save(user: IUser) {
    if (user.password === user.passwordRepeat) {
      this.service.registerUser(user).subscribe((res) => {
        if (res.data?.error) {
          this.service.presentAlert(
            "Mensaje",
            "Ha ocurrido un error, ya existe un usuario con este correo",
            "Aceptar"
          );
        } else {
          this.service.presentAlert(
            "Mensaje",
            `Usuario ${res.data?.data?.email} agregado correctamente`,
            "Aceptar"
          );
          this.backButton();
        }
      });
    } else {
      this.service.presentAlert(
        "Mensaje",
        "Las contraseñas no coinciden",
        "Aceptar"
      );
    }
  }

  uploadAvatar() {
    console.log("upload");
  }

  togglePasswordMode() {
    this.passwordType = this.passwordType === "text" ? "password" : "text";
  }
  backButton() {
    this.navCtrl.back();
  }
}
