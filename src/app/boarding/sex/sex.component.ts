import { Component, OnInit } from '@angular/core';
import { DogService } from 'src/app/services/dog.service';

@Component({
  selector: 'app-sex',
  templateUrl: './sex.component.html',
  styleUrls: ['./sex.component.scss'],
})
export class SexComponent  implements OnInit {

  constructor(
    public dogS: DogService
  ) { }

  ngOnInit() {}

}
