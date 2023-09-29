import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private router: Router, 
    public userS: UserService, 
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) {}


  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  
  addDog(){
    const dogsLength = this.userS.logged?.dogsCant || 0
    if(dogsLength >= 5){
      this.presentAlert('Limite Alcanzado', 'Ya ha alcanzado el limite de perros agregados el cual es 5.')
    }else{
      this.router.navigate(['/boarding/name'])
    }
  }
}
