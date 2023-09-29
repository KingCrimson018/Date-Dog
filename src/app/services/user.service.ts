import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Dog, User } from '../models/Models';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { Platform } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { StorageService } from './storage.service';
import { DogService } from './dog.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  logged!: User | undefined

  ///-Search User-///
  lastUser: any = null
  usersCompleted: boolean = false
  constructor(
    private fs: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    private platform: Platform,
    private st: StorageService,
    private dogS: DogService
  ) {
    this.getLoggedInfo()
   }

  logIn(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password).then(user => {
      this.fs.collection<User>("users").doc(user.user?.uid).get().forEach(res => {
        this.logged = res.data()
      }).then(() => {
        this.setUpNotifications()
      }).then(() => {
        this.router.navigate(["tabs/index"])
      })
    })
  }

  register(user: User, password: string, photoFile: any){
    return this.auth.createUserWithEmailAndPassword(user.email, password).then(res => {
      user.uid = res.user?.uid
    }).then(() => {
      this.st.uploadImage(`users/${user.photoId}/profile/`, photoFile).then(() => {
        this.st.getImageUrl(`users/${user.photoId}/`).subscribe(async res => {
          user.imgProfileUrl = await res.items[0].getDownloadURL()
          this.logged = user
          this.fs.collection<User>("users").doc(user.uid).set(user).then(() => {
            this.setUpNotifications()
          }).then(() => {
            this.router.navigate(['tabs/index'])
          })
        })
      })
        

      
    })
  }

  getUsers(parameterType: string, parameter: string){
    if(parameterType == "name"){
      parameter =  parameter?.charAt(0).toUpperCase() + parameter?.slice(1)
      if(this.lastUser == null){
        return this.fs.collection<User>('users', ref => ref.where("firstName", ">=", parameter).where("firstName", "<=", parameter + "\uf8ff" ).where("active", "==", true).orderBy("firstName").limit(12)).get()
      }else{
        return this.fs.collection<User>('users', ref => ref.where("firstName", ">=", parameter).where("firstName", "<=", parameter + "\uf8ff" ).where("active", "==", true).orderBy("firstName").limit(12).startAfter(this.lastUser)).get()
      }
      
    }else if(parameterType == "city"){
      parameter =  parameter?.charAt(0).toUpperCase() + parameter?.slice(1)
      if(this.lastUser == null){
        return this.fs.collection<User>('users', ref => ref.where("city", "==", parameter).where("active", "==", true).orderBy("firstName").limit(12)).get()
      }else{
        return this.fs.collection<User>('users', ref => ref.where("city", "==", parameter).where("active", "==", true).startAfter(this.lastUser).orderBy("firstName").startAfter(this.lastUser).limit(12)).get()
      }
      
    }else if(parameterType == "country"){
      parameter =  parameter?.charAt(0).toUpperCase() + parameter?.slice(1)
      if(this.lastUser == null){
        return this.fs.collection<User>('users', ref => ref.where("country", "==", parameter).where("active", "==", true).orderBy("firstName").limit(12)).get()
      }else{
        return this.fs.collection<User>('users', ref => ref.where("country", "==", parameter).where("active", "==", true).orderBy("firstName").startAfter(this.lastUser).limit(12)).get()
      }
      
    }else if(parameterType == "state"){
      parameter =  parameter?.charAt(0).toUpperCase() + parameter?.slice(1)
      if(this.lastUser == null){
        return this.fs.collection<User>('users', ref => ref.where("state", "==", parameter).where("active", "==", true).orderBy("firstName").limit(12)).get()
      }else{
        return this.fs.collection<User>('users', ref => ref.where("state", "==", parameter).where("active", "==", true).orderBy("firstName").startAfter(this.lastUser).limit(12)).get()
      }
      
    }else{
      parameter =  parameter?.charAt(0).toUpperCase() + parameter?.slice(1)
      if(this.lastUser == null){
        return this.fs.collection<User>('users', ref => ref.where("zipcode", "==", parameter).where("active", "==", true).orderBy("firstName").limit(12)).get()
      }else{
        return this.fs.collection<User>('users', ref => ref.where("zipcode", "==", parameter).where("active", "==", true).orderBy("firstName").startAfter(this.lastUser).limit(12)).get()
      }
      
    }
    
  }
  updateUserInfo(user: User){
    return this.fs.collection<User>('users').doc(this.logged?.uid).update(user).then(() => {
      this.logged = user
    })
  }
  recoverPassword(email: string){
    return this.auth.sendPasswordResetEmail(email)
  }
  disableUser(user: User){
    return this.fs.collection('users').doc(user.uid).update({active: false})
  }
  updateUserToken(token: string){
    return this.fs.collection<User>("users").doc(this.logged?.uid).update({fcmToken: token}).then(() => {
      this.dogS.getDogsByOwner(this.logged?.uid || "").forEach(res => {
        res.docs.forEach(dog => {
          this.fs.collection<Dog>("dogs").doc(dog.data().id).update({ownerFcmToken: token})
        })
      })
    })
  }
  setUpNotifications(){
    if(this.platform.is("capacitor")){
      PushNotifications.requestPermissions().then(result => {
        if (result.receive === 'granted') {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }
      });
  
      PushNotifications.addListener('registration', (token: Token) => {
        if(token.value != this.logged?.fcmToken){
          this.updateUserToken(token.value)
        }
      });
  
      PushNotifications.addListener('registrationError', (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      });
  
      PushNotifications.addListener(
        'pushNotificationReceived',
        (notification: PushNotificationSchema) => {
          
        },
      );
  
      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        (notification: ActionPerformed) => {
          alert('Push action performed: ' + JSON.stringify(notification));
        },
      );
    }
  }
  getUserInfo(uid: string){
    return this.fs.collection<User>('users').doc(uid).get()
  }

  getLoggedInfo(){
    this.auth.authState.subscribe(user => {
      if(user){
        this.fs.collection<User>("users").doc(user.uid).valueChanges().subscribe(user => {
          this.logged = user
          this.setUpNotifications()
        })
      }
    })
  }
}
