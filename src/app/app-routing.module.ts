import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./boarding/boarding.module').then(m => m.BoardingPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [LoggedGuard]
  },
  {
    path: 'boarding',
    loadChildren: () => import('./boarding/boarding.module').then( m => m.BoardingPageModule)
  },
  {
    path: 'dog-details',
    loadChildren: () => import('./views/dog-details/dog-details.module').then( m => m.DogDetailsPageModule),
    canActivate: [LoggedGuard]
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./views/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule),
    canActivate: [LoggedGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./views/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [LoggedGuard]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
