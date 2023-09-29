import { Component, OnInit } from '@angular/core';
import { DogService } from 'src/app/services/dog.service';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss'],
})
export class NameComponent  implements OnInit {

  constructor(
    public dogS: DogService, 
  ) { }

  ngOnInit() {}

}
