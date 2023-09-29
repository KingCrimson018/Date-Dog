import { Component, OnInit } from '@angular/core';
import { Dog } from 'src/app/models/Models';
import { DogService } from 'src/app/services/dog.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.page.html',
  styleUrls: ['./dogs.page.scss'],
})
export class DogsPage implements OnInit {
  myDogs: Dog[] = []
  constructor(
    private userS: UserService,
    private dogS: DogService
  ) { 
    this.dogS.getDogsByOwner(this.userS.logged?.uid || "").forEach(res => {
      res.docs.forEach(dog => {
        this.myDogs.push(dog.data())
      })
    })
  }

  ngOnInit() {
  }

  refreshDogs(event: any){
    setTimeout(() => {
      this.myDogs = []
      this.dogS.getDogsByOwner(this.userS.logged?.uid || "").forEach(res => {
        res.docs.forEach(dog => {
          this.myDogs.push(dog.data())
        })
      })
      event.target.complete()
    },1500)
  }

}
