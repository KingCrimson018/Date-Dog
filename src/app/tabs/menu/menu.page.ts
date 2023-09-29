import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private alertController: AlertController,
    public userS: UserService
  ) { }

  ngOnInit() {
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  addDog(){
    let n = this.userS.logged?.dogsCant || 0
    if(n >= 5){
      this.presentAlert('Limite Alcanzado', 'Tan solo puedes guardar un limite de 5 Perros')
    }else{
      this.router.navigate(['/boarding/name']);
    }
    
  }
  editProfile(){
    // let lastDateUpdated = new Date(this.userS.logged.lastDateUpdated)
    // lastDateUpdated.setHours(0,0,0,0)
    // let today = new Date()
    // today.setHours(0,0,0,0)
    // console.log(this.userS.logged.lastDateUpdated)
    // console.log(lastDateUpdated)
    // console.log(today)
    // if(lastDateUpdated < today || this.userS.logged.lastDateUpdated == undefined ){
      this.router.navigate(['/edit-profile']);
    // }else{
    //   this.presentAlert('Limite Alcanzado', 'Solo puede hacer una ediccion de perfil por dia. Espere al dia siguiente si desea editar algo mas.')
    // }
    
  }

  logOut(){
    this.auth.signOut().then(() => {
      this.userS.logged = undefined
      this.router.navigate(['/boarding/login'])

    })
  }


}
