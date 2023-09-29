import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dog } from 'src/app/models/Models';
import { DogService } from 'src/app/services/dog.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.scss'],
})
export class DogComponent  implements OnInit {

  today: Date = new Date();
  endDate: Date = new Date()
  startDate: Date = new Date()
  @Input() dog: Dog = {
    name: '',
    dob: new Date,
    ownerId: '',
    active: false,
    ownerName: '',
    id: '',
    breed: '',
    sex: '',
    followersCant: 0
  }
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

  seeDetails() {
    localStorage.setItem('dogDetails', JSON.stringify(this.dog))
    this.router.navigate(['/dog-details']);
  }
}
