import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: AngularFireStorage
  ) { }

  uploadImage(path: string, data: any){
    return this.storage.upload(path, data)
  }
  getImageUrl(path:string){
    return this.storage.ref(path).listAll()
  }

  deleteImages(path: string){
    return this.storage.ref(path).listAll().subscribe(res => {
      res.items.forEach(item => {
        item.delete()
      })
    })
  }
}
