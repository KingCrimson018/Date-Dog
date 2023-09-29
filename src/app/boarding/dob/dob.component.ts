import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DogService } from 'src/app/services/dog.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dob',
  templateUrl: './dob.component.html',
  styleUrls: ['./dob.component.scss'],
})
export class DobComponent  implements OnInit {
  
  constructor(
    public dogS: DogService
  ) { }

  ngOnInit() {}

}
