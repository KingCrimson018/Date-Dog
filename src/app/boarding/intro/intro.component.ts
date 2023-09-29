import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent  implements OnInit {

  constructor(
    private router: Router, 
    private userService: UserService
  ) {
    
   }

  ngOnInit() {
    setTimeout(() => {
      if(this.userService.logged){
        this.router.navigate(['tabs/index'])
      }else{
        this.router.navigate(['boarding/login'])
      }
    },2000)
  }

}
