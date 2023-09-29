import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Address, User } from 'src/app/models/Models';
import { FollowService } from 'src/app/services/follow.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        
      },
    },
    {
      text: 'OK',
      role: 'confirmar',
      handler: () => {
        this.changePassword()
        this.presentToast('Link enviado a tu correo para cambiar la contraseña');
      },
    },
  ];
  public alertButtonsSave = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        
      },
    },
    {
      text: 'OK',
      role: 'confirmar',
      handler: () => {
        this.save()
        this.presentToast('Cambios Guardados')
      },
    },
  ];

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
  address: Address = {
    street: '',
    city: '',
    country: ''
  }
  constructor(
    public userS: UserService,
    private router: Router,
    private st: StorageService,
    private followService: FollowService,
    private toastController: ToastController
  ) {
    this.user = this.userS.logged || {
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
   }

  ngOnInit() {
  }

  uploadImage($event: any){
    this.st.uploadImage(`users/${this.user?.firstName}/profile/`, $event.target.files[0]).then( () => {
      this.getImageUrl(`users/${this.user?.firstName}/`)
    })

  }
  getImageUrl(url: string){
    this.st.getImageUrl(url).subscribe(async res => {
      this.user.imgProfileUrl =  await res.items[0].getDownloadURL()
    })
  }
  changePassword(){
    this.userS.recoverPassword(this.user.email)
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }
  
  cancel(){
    this.router.navigate(['tabs/more-options'])
  }
  async save(){

    this.user.lastDateUpdated = new Date().toString()
    await this.userS.updateUserInfo(this.user)
    // await this.followService.updateFollowedInfo(this.user)
    // await this.followService.updateFollowerInfo(this.user)
    this.router.navigate(['tabs/inicio'])
  }

}
