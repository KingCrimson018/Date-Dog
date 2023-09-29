import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SearchBreedComponent } from 'src/app/components/modals/search-breed/search-breed.component';
import { DogService } from 'src/app/services/dog.service';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.scss'],
})
export class BreedComponent  implements OnInit {

  constructor(
    private modalCtrl: ModalController,
     public dogS: DogService,
  ) { }

  ngOnInit() {}

  async openModalSearch(){
    const modal = await this.modalCtrl.create({
      component: SearchBreedComponent,
    });
    modal.present();

    const {data} = await modal.onDidDismiss();
    this.dogS.newDog.breed = data
  }
}
