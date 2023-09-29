import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/Models';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {
  public userForm!: FormGroup
  foto: any
  fotoFile: any
  photoId: string = ""
  password: string = ""
  imgUrl:string = "../../../assets/image/User.png"

  constructor(
    private st: StorageService, 
    private router: Router, 
    private userS:UserService, 
    private fb: FormBuilder, 
    private fire: AngularFirestore
  ) {
    this.photoId = this.fire.createId()
    this.userForm = this.fb.group({
      'firstName': ['', Validators.required],
      'lastName':  ['', Validators.required],
      'email':  ['', Validators.required],
      'address': this.fb.group({
        'street':  ['', Validators.required],
        'city':  ['', Validators.required],
        'state':  [''],
        'country':  ['', Validators.required],
        'zipCode':  ['',]
      }),
      'dogs': [[]],
      'premium':  [false],
      'active': [true],
      'instagram': [''],
      'facebook': ['']

    })
   }

  ngOnInit() {}

  registerWithEmail(){
    const userF = this.userForm.value
    let user: User = {
      firstName: userF.firstName,
      lastName: userF.lastName,
      email: userF.email,
      street: userF.address.street,
      city: userF.address.city,
      country: userF.address.country,
      state: userF.address.state,
      zipcode: userF.address.zipCode,
      imgProfileUrl: '',
      premium: userF.premium,
      dogsFollowedCant: 0,
      active: userF.active,
      instagram: userF.instagram,
      facebook: userF.facebook,
      photoId: this.photoId,
      followersCant: 0,
      followedsCant: 0,
      dogsCant: 0
    }
    user.photoId = this.photoId
    this.userS.register(user, this.password, this.fotoFile)
  }
  uploadImage($event: any){
    this.fotoFile = $event?.target.files[0];
    const reader = new FileReader()
    reader.onload = (e) => {
      this.foto = e.target?.result
    }
    reader.readAsDataURL(this.fotoFile)
  }
  getImageUrl(url: string){
     this.st.getImageUrl(url).subscribe(async res => {
      this.imgUrl =  await res.items[0].getDownloadURL()
    })
  }
  
}
