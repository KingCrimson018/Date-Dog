import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Dog } from 'src/app/models/Models';
import { DogService } from 'src/app/services/dog.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-edit-dog',
  templateUrl: './edit-dog.component.html',
  styleUrls: ['./edit-dog.component.scss'],
})
export class EditDogComponent  implements OnInit {
  public alertButtonsUpdate = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        
      },
    },
    {
      text: 'Confirm',
      role: 'confirm',
      handler: () => {
        this.dogS.updateDog(this.dog)
        this.modalCtrl.dismiss()
      },
    },
  ];
  public alertButtonsCancel = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        
      },
    },
    {
      text: 'Discard',
      role: 'confirm',
      handler: () => {
        this.modalCtrl.dismiss()
      },
    },
  ];

  dog: Dog = {
    name: '',
    dob: new Date(),
    ownerId: '',
    active: false,
    ownerName: '',
    id: '',
    breed: '',
    sex: '',
    followersCant: 0
  }

  constructor(
    private st: StorageService,
    private dogS: DogService,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {}


  uploadImage($event: any){
    this.st.uploadImage(`dogs/${this.dog.id}/profile/`, $event.target.files[0]).then( () => {
      this.getImageUrl(`dogs/${this.dog.id}/`)
    })
  }
  getImageUrl(url: string){
    this.st.getImageUrl(url).subscribe(async res => {
      this.dog.profilePhotoUrl =  await res.items[0].getDownloadURL()
    })
  }

  uploadVaccineImage($event: any){
    let cant = this.dog.vaccinationUrl?.length || 0
    cant ++
    let newLink = ""
    this.st.uploadImage(`dogs/${this.dog.id}/vaccine/photo${cant}.jepg png`, $event.target.files[0]).then( () => {
      this.st.getImageUrl(`dogs/${this.dog.id}/vaccine/`).subscribe(async res => {
        let photoLinks =  [] 
          for(let url of res.items){
            newLink = await url.getDownloadURL()
            photoLinks.push(newLink)
          }
          this.dog.vaccinationUrl  = photoLinks
        })
    })
  }
  addPhoto($event: any) {
    let cant = this.dog.photosUrl?.length || 0
    cant++
    let newLink = ""
    this.st.uploadImage(`dogs/${this.dog.id}/photos/photo${cant}.jepg png`,$event.target.files[0]).then(() => {
      this.st.getImageUrl(`dogs/${this.dog.id}/photos/`).subscribe(async res => {
      let photoLinks =  [] 
        for(let url of res.items){
          newLink = await url.getDownloadURL()
          photoLinks.push(newLink)
        }
        this.dog.photosUrl = photoLinks
      })
    })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'No yet',
      message: 'Accion no habilitada aun',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
