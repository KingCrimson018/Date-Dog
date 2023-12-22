import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { Dog, User } from 'src/app/models/Models';
import { DogService } from 'src/app/services/dog.service';
import { FollowService } from 'src/app/services/follow.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {


  dogsFollowed: any[] = []
  lastDogFollowedNumber: number = 0

  searchDog: string = ''
  dogs: Dog[] = []
  filteredDogs: Dog[] = [] 
  breed: string = ''
  sex: string = ''

  //--Users--//
  filterUser:string = ''
  users: User[] = []
  searchingUsers: boolean = true


  @ViewChild('IonInfiniteScroll1')  infiniteScroll1!: IonInfiniteScroll
  @ViewChild('IonInfiniteScroll2')  infiniteScroll2!: IonInfiniteScroll
  @ViewChild('IonInfiniteScroll3')  infiniteScroll3!: IonInfiniteScroll
  constructor(
    private userS: UserService,
    private dogS: DogService,
    private router: Router,
    private modalController: ModalController,
    private followService: FollowService,
    
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.getFollowedDogs()
      this.getDogs()
      this.filterUsers()
    },1000)


  }

  getFollowedDogs(){
    this.dogsFollowed = []
    this.followService.lastDogFollowed = null
    this.followService.getDogsFolloweds(this.userS.logged?.uid || "").forEach(res => {
      this.followService.lastFollower = res.docs[res.docs.length - 1].data()
      if(res.docs.length < 12){
        this.infiniteScroll1.disabled = true
      }
      res.docs.forEach(dogFollowed => {
        this.dogsFollowed.push(dogFollowed.data().dogInfo)
        console.log(dogFollowed.data());
      })
    })



  }
  getMoreFollowedDogs(event: any){

    setTimeout(() => {
      this.followService.getDogsFolloweds(this.userS.logged?.uid || "").forEach(res => {
        this.followService.lastDogFollowed = res.docs[res.docs.length - 1].data()
        if(res.docs.length < 12){
          this.infiniteScroll1.disabled = true
        }
        res.docs.forEach(dogFollowed => {
          this.dogsFollowed.push(dogFollowed.data().dogInfo)
        })
      })
      event.target.complete()
    }, 100);

  }
  

  toogleSearch(){
    this.searchingUsers = !this.searchingUsers
  }

  //------Users-----///

  seeDetailsUser(user: User){
    if(user.uid == this.userS.logged?.uid){
      this.router.navigate(['tabs/my-profile']).then(() => {
        this.modalController.dismiss()
      })
    }else{
      this.userS.getUserInfo(user.uid || "").forEach(res => {
        localStorage.setItem('profileDetails', JSON.stringify(res.data()))
      }).then(() => {
        this.router.navigate(['/profile']).then(() => {
          this.modalController.dismiss()
        })
      })
    }

  }

  filterUsers(){
    this.infiniteScroll2.disabled = false
    this.userS.usersCompleted = true
    this.users = []
    this.userS.lastUser = null
    this.userS.getUsers("name", this.filterUser).forEach(res => {
      this.userS.lastUser = res.docs[res.docs.length - 1]
      res.docs.forEach(user => {
        this.users.push(user.data())
      })
    })
  }
  getMoreUsers(event: any){
    setTimeout(() => {
      this.userS.getUsers("name", this.filterUser).forEach(res => {
        this.userS.lastUser = res.docs[res.docs.length - 1]
        if(res.docs.length < 12){
          this.userS.usersCompleted = true
          this.infiniteScroll2.disabled = true
        }
        res.docs.forEach(user => {
          this.users.push(user.data())
        })
      })
      event.target.complete()
    },1500)
  }


  ///-----Dogs-----///

  seeDogDetails(dog: Dog){
    localStorage.setItem('dogDetails', JSON.stringify(dog))
    this.router.navigate(['/dog-details']);
    this.modalController.dismiss()
  }

  getDogs(){
    this.infiniteScroll3.disabled = false
    this.dogs = []
    this.dogS.lastDog = null
    this.dogS.getFilteredDogs(this.breed, this.sex, this.searchDog).forEach(res => {
      this.dogS.lastDog = res.docs[res.docs.length - 1]
      res.docs.forEach(dog => {
        this.dogs.push(dog.data())
      })
    })
  }
  getMoreDogs(event: any){
    setTimeout(() => {
      this.dogS.getFilteredDogs(this.breed, this.sex, this.searchDog).forEach(res => {
        this.dogS.lastDog = res.docs[res.docs.length - 1]
        if(res.docs.length < 12){
          this.dogS.dogsCompleted = true
          this.infiniteScroll2.disabled = true
        }
        res.docs.forEach(dog => {
          this.dogs.push(dog.data())
        })
      })
      event.target.complete()
    }, 1500)
  }

  clearAll(){
    this.breed = ""
    this.sex = ""
    this.searchDog = ""
    this.getDogs()
  }

  openModal(){
    this.searchingUsers = true
    if( this.dogs.length == 0 || this.users.length == 0 ){
      this.filterUsers()
      //GetDogs
      this.dogs = []
      this.dogS.lastDog = null
      this.dogS.getFilteredDogs(this.breed, this.sex, this.searchDog).forEach(res => {
        this.dogS.lastDog = res.docs[res.docs.length - 1]
        res.docs.forEach(dog => {
          this.dogs.push(dog.data())
        })
      })
    }
  }
  handleRefresh(event: any){
    setTimeout(() => {
      this.userS.getLoggedInfo()
      this.getFollowedDogs()

      event.target.complete()
    }, 1500)
  }

}
