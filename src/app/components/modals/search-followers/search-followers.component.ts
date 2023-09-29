import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { FollowedInfo, FollowerInfo, User } from 'src/app/models/Models';
import { FollowService } from 'src/app/services/follow.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-followers',
  templateUrl: './search-followers.component.html',
  styleUrls: ['./search-followers.component.scss'],
})
export class SearchFollowersComponent  implements OnInit {

  followers: FollowerInfo[] = []
  filterUser: string = ""
  followed: boolean = false

  @Input() user!: User | undefined
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll


  constructor(
    private followService: FollowService,
    private modalCtrl: ModalController,
    private userS: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getFollowers()
  }


  getFollowers(){
    setTimeout(() => {
      this.followers = []
      this.followService.lastFollower = null
      this.followService.getFollowers(this.user?.uid || "").forEach(res => {
        this.followService.lastFollower = res.docs[res.docs.length - 1].data()
        if(res.docs.length < 12){
          this.infiniteScroll.disabled = true
        }
        res.docs.forEach(follower => {
          this.followers.push(follower.data().followerInfo)
        })
      })
    }, 100);
  }
  getMoreFollowers(event: any){
    setTimeout(() => {
      this.followService.getFollowers(this.user?.uid || "").forEach(res => {
        this.followService.lastFollower = res.docs[res.docs.length - 1].data()
        if(res.docs.length < 12){
          this.infiniteScroll.disabled = true
        }
        res.docs.forEach(follower => {
          this.followers.push(follower.data().followerInfo)
        })
      })
      event.target.complete()
    }, 100);
  }


  seeDetailsFollower(follower: any){
    if(follower.followerId == this.userS.logged?.uid){
      this.cancel().then(() => {
        this.router.navigate(['/tabs/my-profile'])
      })
    }else{
      this.userS.getUserInfo(follower.followerId).forEach(async res => {
        await localStorage.setItem('profileDetails', JSON.stringify(res.data()))
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
