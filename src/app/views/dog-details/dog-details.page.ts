import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { Dog, User } from 'src/app/models/Models';
import { DogService } from 'src/app/services/dog.service';
import { FollowService } from 'src/app/services/follow.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';
import { DogHeatComponent } from 'src/app/components/modals/dog-heat/dog-heat.component';
import { EditDogComponent } from 'src/app/components/modals/edit-dog/edit-dog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dog-details',
  templateUrl: './dog-details.page.html',
  styleUrls: ['./dog-details.page.scss'],
})
export class DogDetailsPage implements OnInit {

  ////-----Follow Vars-----////

  isFollowed: boolean = false;

  today: Date = new Date();
  endDate: Date = new Date()
  startDate: Date = new Date()
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.dogS.disableDog(this.dog)
        this.router.navigate(['/tabs/inicio'])
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
  editingDog: Dog = {
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

  ageNumber = 0
  ageString:string = ""
  isOwner: boolean = false
  isVaccinated: string = ''
  editing: boolean = false

  constructor(
    public userS: UserService,
    private dogS: DogService, 
    private fs: AngularFirestore,
    private st: StorageService,
    private modalCtrl: ModalController,
    private router: Router,
    private followService: FollowService,
    private alertController: AlertController
  ) {
    this.dog = JSON.parse(localStorage.getItem('dogDetails') || "") as Dog 
    setTimeout(() => {
      this.fs.collection<Dog>("dogs").doc(this.dog.id).valueChanges().subscribe(res => {
        this.dog = res || {
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

        this.editingDog = res || {
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

      })
    }, 500)
    this.startDate =  new Date(this.dog.heat?.startDate || '')
    this.endDate =  new Date(this.dog.heat?.endDate || '')
    if(!this.editingDog.aboutMe){
      this.editingDog.aboutMe = "Esta mascota aun no tiene descripcion"
    }
    if(this.userS.logged?.uid == this.dog.ownerId) {
      this.isOwner = true
    }
    if(!this.isOwner){
      this.followService.validateDogIsFollowed(this.dog.id).forEach(res => {
        if(res.docs.length > 0){
          this.isFollowed = true
        }
      })
    }
   }

  ngOnInit() {
    this.ageNumber = differenceInYears(new Date(),new Date(this.dog.dob)) 
    this.ageString = this.ageNumber + " Years" 
    if(this.ageNumber == 0) {
      this.ageNumber = differenceInMonths(new Date(),new Date(this.dog.dob))
      this.ageString = this.ageNumber + " Month" 
    }
    if(this.ageNumber == 0){
      this.ageNumber = differenceInDays(new Date(),new Date(this.dog.dob))
      this.ageString = this.ageNumber + " Days" 
    }
    if(this.dog.vaccinationUrl){
      this.isVaccinated = 'Vaccinated'
    }else{
      this.isVaccinated = 'No Vaccinated'
    }
  }

  async uploadImageVaccine($event: any){
    let vaccinations = this.dog.vaccinationUrl || []
    if(vaccinations.length >= 5){
      const alert = await this.alertController.create({
        header: 'Limite Alcanzado',
        subHeader: 'Ha alcanzado el limite de fotos de vacunas el cual es 5.',
        buttons: ['OK'],
      });
      alert.present()
    }else{
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
  }

  async addPhoto($event: any) {
    
    let photos = this.dog.photosUrl || []
    if(photos.length >= 5){
      const alert = await this.alertController.create({
        header: 'Limite Alcanzado',
        subHeader: `Ha alcanzado el limite de fotos de ${this.dog.name} el cual es 5.`,
        buttons: ['OK'],
      });
      alert.present()
    }else{
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
  }
  async openModalHeat() {
    const modal = await this.modalCtrl.create({
      component: DogHeatComponent,
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    if (data != null) {
      this.dog.heat = data;
      this.dogS.updateDog(this.dog)
    }
  }
  async openModalEditDog(){
    const modal = await this.modalCtrl.create({
      component: EditDogComponent,

    });
    modal.present()
    
  }
  seeOwnerDetails(){
    if(this.dog.ownerId == this.userS.logged?.uid){
      this.router.navigate(['tabs/my-profile'])
    }else{
      this.userS.getUserInfo(this.dog.ownerId).forEach(async res => {
        let user: User | undefined = await res.data()
        localStorage.setItem('profileDetails', JSON.stringify(user))
        this.router.navigate(['/profile'])
      });
    }
  }

  toogleEditing(){
    this.editing = !this.editing
    console.log(this.editing);
    this.editingDog = this.dog
    
  }
  deletePhoto(url : string ){
    this.dog.photosUrl?.splice(this.dog.photosUrl?.indexOf(url),1)
    console.log(this.editingDog.photosUrl);
    console.log(url);
  }

  deletePhotoVaccine(url : string ){
    let vaccinationsUrl = this.dog.vaccinationUrl || []
    this.dog.vaccinationUrl?.splice(vaccinationsUrl.indexOf(url),1)
    this.dog.vaccinationUrl = vaccinationsUrl
    console.log(this.editingDog.photosUrl);
    console.log(url);
  }
  async confirmSaveDog(){
    this.dog = this.editingDog
    this.dogS.updateDog(this.dog)
    const alert = await this.alertController.create({
      header: 'Actualizado',
      subHeader: `Informacion de ${this.dog.name} actualizada.`,
      buttons: ['OK'],
    });
    this.router.navigate(['/tabs/index'])

    await alert.present();
  }
  async saveDog() {
    const alert = await this.alertController.create({
      header: 'Estas seguro?',
      subHeader: 'Seguro que desea guardar estos cambios?',
      message: 'Estos cambios seran inmediatos para todos.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.confirmSaveDog()
          },
        },
      ]
    });

    await alert.present();
  }
  async deleteDog(dog: Dog){
    const alert = await this.alertController.create({
      header: 'Estas Seguro?',
      subHeader: `Estas seguro que deseas eliminar a ${dog.name}`,
      buttons: [
        {
          text: "Cancelar",
          handler: () => {
            
          }
        },
        {
          text: "Confirmar",
          handler: () => {
            this.dogS.disableDog(dog)
            this.router.navigate(['/tabs/inicio'])
          }
        }
      ]
    })
    await alert.present()
    

  }


  //-----------------Follow Functions-------------------//

  async toogleFollowDog(){
    if(this.isFollowed == true){
      this.isFollowed = false
      this.followService.unFollowDog(this.dog)
    }else{
      let n : number | undefined = this.userS.logged?.dogsFollowedCant || 0
      if( n >= 50){
        const alert  = await this.alertController.create({
          header: 'Limite Alcanzado',
          message: 'Ha alcanzado el limite de perros que puede seguir el cual es 50',
          buttons: ['Ok']
        })
        await alert.present()
      }else{
        this.isFollowed = true
        this.followService.followDog(this.dog)
      }
    }
  }
}
