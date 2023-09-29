import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, ModalController, ToastController } from '@ionic/angular';
import { User, Dog, Post } from 'src/app/models/Models';
import { UserService } from 'src/app/services/user.service';
import {Clipboard} from '@angular/cdk/clipboard'
import { DogService } from 'src/app/services/dog.service';
import { FollowService } from 'src/app/services/follow.service';
import { SearchFollowedsComponent } from 'src/app/components/modals/search-followeds/search-followeds.component';
import { SearchFollowersComponent } from 'src/app/components/modals/search-followers/search-followers.component';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  viewDogs:string = 'view'
  linkInstagram:string = 'https://www.instagram.com/'
  linkFacebook:string = 'https://www.facebook.com/'

  dogs: Dog[] = []

  followers: any
  followeds: any


  @ViewChild(IonModal) modal?: IonModal;

  constructor(
    private router: Router, 
    private modalCtrl: ModalController,
    public userS: UserService,
    private dogS: DogService,
    private clipboard: Clipboard,
    private toastController: ToastController,
    private followService: FollowService
  ) {
    setTimeout(() => {
      this.dogS.getDogsByOwner(this.userS.logged?.uid || "").forEach(res => {
        res.docs.forEach(dog => {
          this.dogs.push(dog.data())
        })
      })
    },500)
   }

  ngOnInit() {

  }

  openDogDetails(dog: Dog){
    localStorage.setItem('dogDetails',JSON.stringify(dog))
    this.router.navigate(['/dog-details'])
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

  async presentToastWhatsApp() {
    const toast = await this.toastController.create({
      message: `WhatsApp de ${this.userS.logged?.firstName} copiado.`,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  copyWhatsapp(){
    this.clipboard.copy(this.userS.logged?.whatsapp || '')
    this.presentToastWhatsApp()
  }

  async openModalFollowers(){
    const modal = await this.modalCtrl.create({
      component: SearchFollowersComponent,
      componentProps: {
        user: this.userS.logged
      }
    })
    await modal.present()
  }
  async openModalFolloweds(){
    const modal = await this.modalCtrl.create({
      component: SearchFollowedsComponent,
      componentProps: {
        user: this.userS.logged
      }
    })
    await modal.present()
  }



}
