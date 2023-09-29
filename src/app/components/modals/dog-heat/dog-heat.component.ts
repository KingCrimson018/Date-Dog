import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Dog, Heat } from 'src/app/models/Models';
import { DogService } from 'src/app/services/dog.service';

@Component({
  selector: 'app-dog-heat',
  templateUrl: './dog-heat.component.html',
  styleUrls: ['./dog-heat.component.scss'],
})
export class DogHeatComponent  implements OnInit {

  today: Date = new Date()
  startDate: Date = new Date()
  endDate: Date = new Date()
  @Input() dog: Dog = {
    name: '',
    dob: undefined,
    ownerId: '',
    active: false,
    id: '',
    breed: '',
    sex: '',
    ownerName: '',
    followersCant: 0
  }

  
  constructor(
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private dogS: DogService,
  ) { }

  ngOnInit() {}

  confirm(){
    let newHeat: Heat = {
      startDate: this.startDate,
      endDate: this.endDate,
    }

    if(newHeat.startDate != this.today && newHeat.endDate == this.today){
      newHeat.endDate = ""
      this.dog.heat = newHeat
      this.dogS.updateDog(this.dog)
      this.modalCtrl.dismiss()


    }else if(newHeat.startDate != this.today && newHeat.endDate != this.today){
      this.dog.heat = newHeat
      this.dogS.updateDog(this.dog)
      this.modalCtrl.dismiss()
    }
    else if(this.dog.heat?.startDate && newHeat.endDate != this.today ){
      console.log('Hola piter');
      
      this.dog.heat.endDate = newHeat.endDate
      this.dogS.updateDog(this.dog)
      this.modalCtrl.dismiss()
    }
  }

  cancel(){
    return this.modalCtrl.dismiss()
  }
}
