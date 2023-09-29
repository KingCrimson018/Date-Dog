import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { FollowedInfo, User } from 'src/app/models/Models';
import { FollowService } from 'src/app/services/follow.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-followeds',
  templateUrl: './search-followeds.component.html',
  styleUrls: ['./search-followeds.component.scss'],
})
export class SearchFollowedsComponent  implements OnInit {
  filterUser: string = ""
  followeds: FollowedInfo[] = []
  followed: boolean = false

  @Input() user!: User | undefined
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll
  constructor(
    private followService: FollowService,
    private modalCtrl: ModalController,
    private userS: UserService,
    private router: Router
  ) {
    this.getFolloweds()
   }

  ngOnInit() {
    
  }
  getFolloweds(){
    setTimeout(() => {
      this.followeds = []
      this.followService.lastFollower = null
      this.followService.getFolloweds(this.user?.uid || "").forEach(res => {   
        this.followService.lastFollower = res.docs[res.docs.length - 1].data()
        if(res.docs.length < 12){
          this.infiniteScroll.disabled = true
        }
        res.docs.forEach(followed => {
          this.followeds.push(followed.data().followedInfo)
        })
      })
    }, 100);
  }

  getMoreFolloweds(event: any){
    setTimeout(() => {
      this.followService.getFollowers(this.user?.uid || "").forEach(res => {
        this.followService.lastFollower = res.docs[res.docs.length - 1].data()
        if(res.docs.length < 12){
          this.infiniteScroll.disabled = true
        }
        res.docs.forEach(followed => {
          this.followeds.push(followed.data().followedInfo)
        })
      })
      event.target.complete()
    }, 100);
  }

  seeDetailsFollowed(followed: any){
    if(followed.followedId == this.userS.logged?.uid){
      this.cancel().then(() => {
        this.router.navigate(['/tabs/my-profile'])
      })
    }else{
      this.userS.getUserInfo(followed.followedId).forEach(async res => {
        console.log(res.data());
        
        await localStorage.setItem('profileDetails', JSON.stringify( res.data()))
      }).then(() => {
        this.router.navigate(['/profile'])
        this.cancel()
      })
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
