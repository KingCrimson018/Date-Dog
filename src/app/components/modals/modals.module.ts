import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DogHeatComponent } from './dog-heat/dog-heat.component';
import { EditDogComponent } from './edit-dog/edit-dog.component';
import { SearchComponent } from './search/search.component';
import { SearchBreedComponent } from './search-breed/search-breed.component';
import { SearchFollowedsComponent } from './search-followeds/search-followeds.component';
import { SearchFollowersComponent } from './search-followers/search-followers.component';



@NgModule({
  declarations: [DogHeatComponent, EditDogComponent, SearchComponent, SearchBreedComponent, SearchFollowedsComponent, SearchFollowersComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [DogHeatComponent, EditDogComponent, SearchComponent, SearchBreedComponent, SearchFollowedsComponent, SearchFollowersComponent]
})
export class ModalsModule { }
