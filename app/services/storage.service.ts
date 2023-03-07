import { EventEmitter, Injectable, Output } from '@angular/core';
import { StanfordSleepinessData } from '../../app/data/stanford-sleepiness-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { Storage } from '@ionic/storage-angular';
import { promises } from 'dns';


const STORAGE_KEY='mylist'
const SECOND_KEY='sleepList'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

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
    const storedData=await this.storage.get(STORAGE_KEY)||[];
    storedData.push(item);
    return this.storage.set(STORAGE_KEY,storedData);
  }

  async removeItem(index){
    const storedData=await this.storage.get(STORAGE_KEY)||[];
    storedData.splice(index,1);
    return this.storage.set(STORAGE_KEY,storedData);
  }



  getSleepData(){
    return this.storage.get(SECOND_KEY)||[];
  }

  async addSleepData(item){
    const storedData=await this.storage.get(SECOND_KEY)||[];
    storedData.push(item);
    return this.storage.set(SECOND_KEY,storedData);
  }

  async removeSleepItem(index){
    const storedData=await this.storage.get(SECOND_KEY)||[];
    storedData.splice(index,1);
    return this.storage.set(SECOND_KEY,storedData);
  }


    
}