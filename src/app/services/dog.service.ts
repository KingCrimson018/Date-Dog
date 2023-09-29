import { Injectable } from '@angular/core';
import { Dog } from '../models/Models';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from './user.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DogService {

  newDog: Dog = {
    id: this.fs.createId(),
    breed: '',
    name: '',
    dob: new Date(),
    ownerId: '',
    active: true,
    sex: '',
    ownerName: '',
    profilePhotoUrl: "../../../assets/image/PerfilPerro.jpg",
    followersCant: 0
  }

  lastDog: any = null
  dogsCompleted: boolean = false
  constructor(
    private fs: AngularFirestore,

  ) { }


  getAllDogs(){
    return this.fs.collection<Dog>("dogs", ref => ref.where("active", "==", true).limit(12).orderBy("name", "asc")).get()
  }

  getFilteredDogs(breed: string, sex: string, name: string){
    if(name != ''){
      name = name?.charAt(0).toUpperCase() + name?.slice(1)
    }
  
    if(breed == ''  && sex == '' && name == ''){
      if(this.lastDog == null){
        return this.fs.collection<Dog>('dogs', ref => ref.where("active", "==", true).limit(12).orderBy('name')).get()
      }else{
        return this.fs.collection<Dog>('dogs', ref => ref.where("active", "==", true).startAfter(this.lastDog).limit(12).orderBy('name')).get()
      }
      
    }
    if(breed != '' ){
      if(sex != ''){
        if( name != ''){
          if(this.lastDog == null){
            return this.fs.collection<Dog>('dogs', ref => ref.where("active", "==", true).where('breed', '==', breed).where('sex', '==', sex).where('name', '>=', name).where('name', '<=', name + "\uf8ff").limit(12).orderBy('name')).get()
          }else{
            return this.fs.collection<Dog>('dogs', ref => ref.where("active", "==", true).where('breed', '==', breed).where('sex', '==', sex).where('name', '>=', name).where('name', '<=', name + "\uf8ff").startAfter(this.lastDog).limit(12).orderBy('name')).get()
          }
        }
        if(this.lastDog == null){
          return this.fs.collection<Dog>('dogs', ref => ref.where("active", "==", true).where('breed', '==', breed).where('sex', '==', sex).limit(12).orderBy('name')).get()
        }else{
          return this.fs.collection<Dog>('dogs', ref => ref.where("active", "==", true).where('breed', '==', breed).where('sex', '==', sex).startAfter(this.lastDog).limit(12).orderBy('name')).get()
        }
      }
      if(name != ''){
        if(this.lastDog == null){
          return this.fs.collection<Dog>('dogs', ref => ref.where("active", "==", true).where('breed', '==', breed).where('name', '>=', name).where('name', '<=', name + "\uf8ff").limit(12).orderBy('name')).get()
        }else{
          return this.fs.collection<Dog>('dogs', ref => ref.where("active", "==", true).where('breed', '==', breed).where('name', '>=', name).where('name', '<=', name + "\uf8ff").startAfter(this.lastDog).limit(12).orderBy('name')).get()
        }
      }
      if(this.lastDog == null){
        return this.fs.collection<Dog>('dogs', ref => ref.where("active", "==", true).where('breed', '==', breed).limit(12).orderBy('name')).get()
      }else{
        return this.fs.collection<Dog>('dogs', ref => ref.where("active", "==", true).where('breed', '==', breed).startAfter(this.lastDog).limit(12).orderBy('name')).get()
      }
      
    }else if(sex != ''){
      if(name != ''){
        if(this.lastDog == null){
          return this.fs.collection<Dog>('dogs', ref => ref.where("active", "==", true).where('sex', '==', sex).where('name', '>=', name).where('name', '<=', name + "\uf8ff").limit(12).orderBy('name')).get()
        }else{
          return this.fs.collection<Dog>('dogs', ref => ref.where("active", "==", true).where('sex', '==', sex).where('name', '>=', name).where('name', '<=', name + "\uf8ff").startAfter(this.lastDog).limit(12).orderBy('name')).get()
        }
      }
      if(this.lastDog == null){
        return this.fs.collection<Dog>('dogs', ref => ref.where("active", "==", true).where('sex', '==', sex).limit(12).orderBy('name')).get()
      }else{
        return this.fs.collection<Dog>('dogs', ref => ref.where("active", "==", true).where('sex', '==', sex).startAfter(this.lastDog).limit(12).orderBy('name')).get()
      }
    }else{
      if(this.lastDog == null){
        return this.fs.collection<Dog>('dogs', ref => ref.where("active", "==", true).where('name', '>=', name).where('name', '<=', name + "\uf8ff").limit(12).orderBy('name')).get()
      }else{
        return this.fs.collection<Dog>('dogs', ref => ref.where("active", "==", true).where('name', '>=', name).where('name', '<=', name + "\uf8ff").startAfter(this.lastDog).limit(12).orderBy('name')).get()
      }
    }
  }
  getDogById(id: string){
    return this.fs.collection<Dog>("dogs").doc(id).get()
  }
  getDogsByOwner(ownerId: string){
    return this.fs.collection<Dog>("dogs", ref => ref.where("active", "==", true).where('ownerId', "==", ownerId).orderBy("name")).get()
  }
  addDog(newDog: Dog){
    
    return this.fs.collection<Dog>("dogs").doc(newDog.id).set(newDog).then(() => {
      this.newDog = {
        id: this.fs.createId(),
        breed: '',
        name: '',
        dob: new Date(),
        ownerId: '',
        active: true,
        sex: '',
        ownerName: '',
        profilePhotoUrl: "../../../assets/image/PerfilPerro.jpg",
        followersCant: 0
      }
    })
    //Recuerda escribir una funcion firebase para agregar  la info del perro al dueno
  }
  updateDog(dog: Dog){
    return this.fs.collection<Dog>("dogs").doc(dog.id).update(dog)
  }
  disableDog(dog: Dog){
    return this.fs.collection<Dog>("dogs").doc(dog.id).update({active: false})
  }
  setHeat(dog: Dog){
    return this.fs.collection<Dog>("dogs").doc(dog.id).update(dog)
  }
}
