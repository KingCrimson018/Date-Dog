import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogComponent } from './dog/dog.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { FollowedDogComponent } from './followed-dog/followed-dog.component';



@NgModule({
  declarations: [DogComponent, FollowedDogComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [DogComponent, FollowedDogComponent]
})
export class InicioModule { }
