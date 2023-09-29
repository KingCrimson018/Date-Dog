import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss'],
})
export class RecoverComponent  implements OnInit {

  email:string = ""
  sent: boolean = false

  constructor(
    private userS: UserService
  ) { }

  ngOnInit() {}

  sendPasswordCode(){
    this.userS.recoverPassword(this.email).then(() => {
      this.sent = true
    })
  }
}
