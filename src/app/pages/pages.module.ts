import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home/home.page';

import { HomePageRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { RegisterComponent } from './register/register.component';

import {NotificationsComponent} from './notifications/notifications.component'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  providers: [],
  declarations: [HomePage, LoginComponent, RecoverPasswordComponent, RegisterComponent,NotificationsComponent]
})
export class PagesModule { }
