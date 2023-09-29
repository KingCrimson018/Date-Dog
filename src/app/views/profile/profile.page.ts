import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { SearchFollowedsComponent } from 'src/app/components/modals/search-followeds/search-followeds.component';
import { SearchFollowersComponent } from 'src/app/components/modals/search-followers/search-followers.component';
import { Dog, FollowedInfo, FollowerInfo, User } from 'src/app/models/Models';
import { FollowService } from 'src/app/services/follow.service';
import { UserService } from 'src/app/services/user.service';
import {Clipboard} from '@angular/cdk/clipboard'
import { DogService } from 'src/app/services/dog.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  viewDogs:string = 'view'
  linkInstagram:string = 'https://www.instagram.com/'
  linkFacebook:string = 'https://www.facebook.com/'
  isFollower: boolean = false;
  dogs:Dog[] = [];
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    premium: false,
    active: false,
    dogsCant: 0,
    followersCant: 0,
    followedsCant: 0,
    street: '',
    city: '',
    country: '',
    dogsFollowedCant: 0
  }

  followers: any
  followeds: any


  followed: boolean = false

  constructor(
    private router: Router, 
    private alertController: AlertController,
    private modalCtrl: ModalController,
    public userS: UserService,
    private dogS: DogService,
    private followService: FollowService,
    private clipboard: Clipboard,
    private toastController: ToastController
  ) {
    this.user = JSON.parse(localStorage.getItem('profileDetails') || "") as User
    this.dogS.getDogsByOwner(this.user.uid || "").forEach(res => {
      console.log(res);
      console.log(this.user.uid);
      
      res.docs.forEach(dog => {
        console.log(dog.data());
        
        this.dogs.push(dog.data())
      })
    })

    this.followService.validateUserIsFollowed(this.user.uid || "").forEach(res => {
      if (res.docs.length > 0){
        this.followed = true
      }
    })
    
    // if(this.followService.validateIsFollowed(this.user.uid || '') > 0){
    //   this.followed = true
    // }


   }

  ngOnInit() {

  }

  openDogDetails(dog: Dog){
    localStorage.setItem('dogDetails',JSON.stringify(dog))
    this.router.navigate(['/dog-details'])
  }

  
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }




  async toogleFollower(){
    if(this.followed == true){
      this.followed = false
      this.followService.unfollowUser(this.user.uid || "")

    }else{
      let n : number = this.userS.logged?.followedsCant  || 0
      if(n >= 50){
        const alert = await this.alertController.create({
          header: 'Limite Alcanzado',
          message: 'Ha alcanzado el limite de personas que puede seguir el cual es 50.',
          buttons: ['Ok']
        })
        alert.present()
      }else{
        this.followed = true  
        let followerInfo: FollowerInfo = {
          followerId: this.userS.logged?.uid || '',
          followerFirstName: this.userS.logged?.firstName || "",
          followerLastName: this.userS.logged?.lastName || "",
          followerImgUrl: this.userS.logged?.imgProfileUrl || '' ,
          followerFcmToken: this.userS.logged?.fcmToken || "",
        }
        
        let followedInfo: FollowedInfo =  {
          followedId: this.user.uid || '',
          followedFirstName: this.user.firstName,
          followedLastName: this.user.lastName,
          followedImgUrl: this.user.imgProfileUrl || '',
          followedFcmToken: this.user.fcmToken || "",
        }
        
        this.followService.followUser(followerInfo, followedInfo)
        this.followed = true
      }
    }
    
  }
  async presentToastWhatsApp() {
    const toast = await this.toastController.create({
      message: `WhatsApp de ${this.user.firstName} copiado.`,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  copyWhatsapp(){
    this.clipboard.copy(this.user.whatsapp || '')
    this.presentToastWhatsApp()
  }

  async openModalFollowers(){
    const modal = await this.modalCtrl.create({
      component: SearchFollowersComponent,
      componentProps: {
        user: this.user
      }
    })
    await modal.present()
  }
  async openModalFolloweds(){
    const modal = await this.modalCtrl.create({
      component: SearchFollowedsComponent,
      componentProps: {
        user: this.user
      }
    })
    await modal.present()
  }
}


