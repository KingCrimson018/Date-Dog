import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Dog, DogFollowedInfo, DogFollowerInfo, Follow, FollowDog, FollowedInfo, FollowerInfo, User } from '../models/Models';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  lastFollower: any = null
  completedFollower: boolean = false

  lastFollowed: any = null
  completedFollowed: boolean = false
  
  lastDogFollowed: any = null
  completedDogsFollowed: boolean = false
  constructor(
    private fs: AngularFirestore,
    private userS: UserService
  ) { }


  getFolloweds(uid: string){
    if(this.lastFollowed == null){
      return this.fs.collection<Follow>("follow", ref => ref.where("followerId", "==", uid).orderBy("date", "desc").limit(12)).get()
    }else{
      return this.fs.collection<Follow>("follow", ref => ref.where("followerId", "==", uid).orderBy("date", "desc").limit(12).startAfter(this.lastFollowed)).get()
    }
  }
  getFollowers(uid: string){
    if(this.lastFollower == null){
      return this.fs.collection<Follow>("follow", ref => ref.where("followedId", "==", uid).orderBy("date", "desc").limit(12)).get()
    }else{
      return this.fs.collection<Follow>("follow", ref => ref.where("followedId", "==", uid).orderBy("date", "desc").limit(12).startAfter(this.lastFollower)).get()
    }
  }
  followUser(followerInfo: FollowerInfo, followedInfo: FollowedInfo){
    let newFollow: Follow ={
      followId: this.fs.createId(),
      followerId: followerInfo.followerId,
      followerInfo: followerInfo,
      followedId: followedInfo.followedId,
      followedInfo: followedInfo,
      date: new Date()
    }
    this.fs.collection<Follow>("follow").doc(newFollow.followId).set(newFollow)
  }
  unfollowUser(id: string){
    return this.fs.collection<Follow>("follow", ref => ref.where("followerId", "==", this.userS.logged?.uid).where("followedId", "==", id)).get().forEach(res => {
      this.fs.collection<Follow>("follow").doc(res.docs[0].data().followId).delete()
    })
  }
  validateUserIsFollowed(userId: string){
    return this.fs.collection("follow", ref => ref.where("followerId", "==", this.userS.logged?.uid).where("followedId", "==", userId)).get()
  }

  ///---Follow Dogs---///

  getDogsFolloweds(id: string){
    if(this.lastFollowed == null){
      return this.fs.collection<FollowDog>("follow-dogs", ref => ref.where("followerId", "==", id).orderBy("date", "desc").limit(12)).get()
    }else{
      return this.fs.collection<FollowDog>("follow-dogs", ref => ref.where("followerId", "==", id).orderBy("date", "desc").limit(12).startAfter(this.lastDogFollowed)).get()
    }
  }

  followDog(dog: Dog){
    let newDogFollower: FollowerInfo = {
      followerId: this.userS.logged?.uid || "",
      followerFirstName: this.userS.logged?.firstName || "",
      followerLastName: this.userS.logged?.lastName || "",
      followerImgUrl: this.userS.logged?.imgProfileUrl || "",
    }
    let newDogFollowedInfo: DogFollowedInfo = {
      dogId: dog.id,
      dogName: dog.name,
      dogBreed: dog.breed,
      dogImgUrl: dog.profilePhotoUrl || "",
      dogDob: dog.dob,
      dogSex: dog.sex,
      ownerFcmToken: dog.ownerFcmToken

    }
    let newDogFollow: FollowDog = {
      id: this.fs.createId(),
      followerId: this.userS.logged?.uid || "",
      followerInfo: newDogFollower,
      dogId: dog.id,
      dogInfo: newDogFollowedInfo,
      date: new Date()
    }
    return this.fs.collection<FollowDog>("follow-dogs").doc(newDogFollow.id).set(newDogFollow)
  }
  unFollowDog(dog: Dog){
    return this.fs.collection<FollowDog>("follow-dogs", ref => ref.where("followerId", "==", this.userS.logged?.uid).where("dogId", "==", dog.id)).get().forEach(res => {
      this.fs.collection<FollowDog>("follow-dogs").doc(res.docs[0].data().id).delete()
    })
  }
  validateDogIsFollowed(dogId: string){
    return this.fs.collection<FollowDog>("follow-dogs", ref => ref.where("followerId", "==", this.userS.logged?.uid).where("dogId", "==", dogId)).get()
  }
}
