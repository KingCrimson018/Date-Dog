import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dogs',
        loadChildren: () => import('./dogs/dogs.module').then( m => m.DogsPageModule)
      },
      {
        path: 'my-profile',
        loadChildren: () => import('./my-profile/my-profile.module').then( m => m.MyProfilePageModule)
      },
      {
        path: 'index',
        loadChildren: () => import('./index/index.module').then( m => m.IndexPageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
