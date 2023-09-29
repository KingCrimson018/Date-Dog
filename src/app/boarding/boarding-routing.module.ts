import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardingPage } from './boarding.page';
import { BreedComponent } from './breed/breed.component';
import { DobComponent } from './dob/dob.component';
import { LoginComponent } from './login/login.component';
import { NameComponent } from './name/name.component';
import { RecoverComponent } from './recover/recover.component';
import { RegisterComponent } from './register/register.component';
import { SexComponent } from './sex/sex.component';
import { StartComponent } from './start/start.component';
import { VaccineComponent } from './vaccine/vaccine.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { IntroComponent } from './intro/intro.component';
import { LoggedGuard } from '../guards/logged.guard';
import { NotLoggedGuard } from '../guards/not-logged.guard';

const routes: Routes = [
  {
    path: '',
    component: BoardingPage,
    children: [
      {
        path: '',
        redirectTo: '/boarding/intro',
        pathMatch: 'full'
      },
      {
        path: 'intro',
        component: IntroComponent,
        canActivate: [NotLoggedGuard]
      },
      {
        path: 'breed',
        component: BreedComponent,
        canActivate: [LoggedGuard]
      },
      {
        path: 'dob',
        component: DobComponent,
        canActivate: [LoggedGuard]
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [NotLoggedGuard]
      },
      {
        path: 'name',
        component: NameComponent,
        canActivate: [LoggedGuard]
      },
      {
        path: 'recover',
        component: RecoverComponent,
        canActivate: [LoggedGuard]
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NotLoggedGuard]
      },
      {
        path: 'sex',
        component: SexComponent,
        canActivate: [LoggedGuard]
      },
      {
        path: 'start',
        component: StartComponent,
        canActivate: [NotLoggedGuard]
      },
      {
        path: 'vaccine',
        component: VaccineComponent,
        canActivate: [LoggedGuard]
      },
      {
        path: 'welcome',
        component: WelcomeComponent,
        canActivate: [LoggedGuard]
      },
    ]
  },
  {
    path: '',
    redirectTo: '/boarding/intro',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardingPageRoutingModule {}
