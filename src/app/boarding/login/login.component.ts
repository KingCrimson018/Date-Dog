import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  email:string = ""
  password:string = ""
  rememberMe:boolean = false
  
  constructor(
    private router: Router, 
    private userS: UserService
  ) { }

  ngOnInit() {
    try{
      let credentials =   JSON.parse(localStorage.getItem('credentials') || "")
      if(credentials != null){
        this.rememberMe = true
        this.email = credentials.email
        this.password = credentials.password
        
        console.log(credentials)
      }
    }catch(err){
      console.log(err)
    }
  }

  logIn(){
    this.userS.logIn(this.email, this.password)
    if(this.rememberMe){
      localStorage.setItem('credentials', JSON.stringify({
        email: this.email,
        password: this.password
      }))
    }else{
      try{
        localStorage.removeItem('credentials')
      }catch(err){
        console.log(err)
      }
    }
    this.email = ""
    this.password = ""
  }

}
