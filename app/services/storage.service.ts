import { EventEmitter, Injectable, Output } from '@angular/core';
import { Preferences, SetOptions, GetOptions, RemoveOptions, KeysResult } from '@capacitor/preferences';
import { StanfordSleepinessData } from '../../app/data/stanford-sleepiness-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { Storage } from '@ionic/storage-angular';


const STORAGE_KEY='mylist'

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public static sleepinessRecord:StanfordSleepinessData[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init(){
    await this.storage.create();
    console.log("start service")
  }
  

  getData(){
    return this.storage.get(STORAGE_KEY)||[];
  }

  async addData(item){
    console.log("add data")
    const storedData=await this.storage.get(STORAGE_KEY)||[];
    storedData.push(item);
    console.log("what is   "+item);
    return this.storage.set(STORAGE_KEY,storedData);
  }

  async removeItem(index){
    const storedData=await this.storage.get(STORAGE_KEY)||[];
    storedData.splice(index,1);
    return this.storage.set(STORAGE_KEY,storedData);
  }








    // public logSleepinessData(sleepData:StanfordSleepinessData) {

  
    //   StorageService.sleepinessRecord.push(sleepData);
    //   //Ionic Storage
    //   this.sleepinessStorage.set(sleepData.id, sleepData);
    // }
    
    // public getAllSleepinessDataFromStorage(){
    //   StorageService.sleepinessRecord.forEach( (element) => {
    //     this.sleepinessStorage.get(element.id).then( (value) => {
    //       console.log(value);
    //     });
    //   });
    // }
    
}