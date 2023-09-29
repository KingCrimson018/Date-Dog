import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoardingPageRoutingModule } from './boarding-routing.module';

import { BoardingPage } from './boarding.page';
import { DobComponent } from './dob/dob.component';
import { BreedComponent } from './breed/breed.component';
import { NameComponent } from './name/name.component';
import { RecoverComponent } from './recover/recover.component';
import { RegisterComponent } from './register/register.component';
import { SexComponent } from './sex/sex.component';
import { StartComponent } from './start/start.component';
import { VaccineComponent } from './vaccine/vaccine.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { IntroComponent } from './intro/intro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BoardingPageRoutingModule
  ],
  declarations: [BoardingPage, DobComponent, BreedComponent, NameComponent, RecoverComponent, RegisterComponent, SexComponent, StartComponent, VaccineComponent, WelcomeComponent, LoginComponent, IntroComponent]
})
export class BoardingPageModule {}
