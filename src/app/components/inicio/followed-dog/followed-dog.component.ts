import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DogFollowedInfo } from 'src/app/models/Models';
import { DogService } from 'src/app/services/dog.service';

@Component({
  selector: 'app-followed-dog',
  templateUrl: './followed-dog.component.html',
  styleUrls: ['./followed-dog.component.scss'],
})
export class FollowedDogComponent  implements OnInit {
  today: Date = new Date();
  endDate: Date = new Date()
  startDate: Date = new Date()
  @Input() dog: DogFollowedInfo = {
    dogId: '',
    dogName: '',
    dogBreed: '',
    dogImgUrl: '',
    dogDob: undefined,
    dogSex: ''
  }
  constructor(
    private router: Router,
    private dogS: DogService
  ) { }

  ngOnInit() {}
  seeDetails() {
    this.dogS.getDogById(this.dog.dogId).forEach(res => {
      localStorage.setItem('dogDetails', JSON.stringify(res.data()))
    }).then(() => {
      this.router.navigate(['/dog-details']);
    })
    
    
  }

}
