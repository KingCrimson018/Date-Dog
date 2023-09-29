import { Component, OnInit } from '@angular/core';
import { DogService } from 'src/app/services/dog.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent  implements OnInit {

  constructor(
    public dogS: DogService,
    private st: StorageService
  ) { }

  ngOnInit() {}


  uploadImage($event: any){
    this.st.uploadImage(`dogs/${this.dogS.newDog.id}/profile/`, $event.target.files[0]).then( () => {
      this.getImageUrl(`dogs/${this.dogS.newDog.id}/`)
    })

  }
  getImageUrl(url: string){
    this.st.getImageUrl(url).subscribe(async res => {
      this.dogS.newDog.profilePhotoUrl =  await res.items[0].getDownloadURL()
    })
  }
}
