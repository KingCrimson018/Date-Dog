import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DogService } from 'src/app/services/dog.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.scss'],
})
export class VaccineComponent  implements OnInit {

  hasVaccine: string = '';
  vaccine: string = '';
  vaccinesUrl: string[] = []
  
  constructor(
    private router: Router, 
    public dogS: DogService, 
    private userS: UserService, 
  ) { }

  ngOnInit() {}


  next(){
    this.dogS.newDog.ownerId = this.userS.logged?.uid || ""
    this.dogS.newDog.ownerName = this.userS.logged?.firstName || ""
    this.dogS.newDog.ownerPhotoUrl = this.userS.logged?.imgProfileUrl
    if(this.userS.logged?.fcmToken){
      this.dogS.newDog.ownerFcmToken = this.userS.logged?.fcmToken
    }
    if(this.hasVaccine == ""){
      this.vaccine = ""
      this.dogS.newDog.vaccinationUrl = [""]

    }

    this.dogS.addDog(this.dogS.newDog).then( () => {
       this.router.navigate(["/tabs/dogs"])
    })
  }
}
