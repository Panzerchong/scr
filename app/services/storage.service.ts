import { EventEmitter, Injectable, Output } from '@angular/core';
import { Preferences, SetOptions, GetOptions, RemoveOptions, KeysResult } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  @Output() allKeysList = new EventEmitter<string[]>();
  @Output() allValuesList = new EventEmitter<string[]>();
  list:string[] = [];

  constructor() { }

  getKeys = async () => {
    await Preferences.keys().then((keys) => {
      this.allKeysList.emit(keys.keys);
      this.list = keys.keys;
      return keys;
    })
  }

  deleteTask = async (key:string) => {
    let options: RemoveOptions = {
      key: key
    };
    await Preferences.remove(options).then(() => {
      // console.log("deleted");
    })
  }

  addTask = async (task:string) => {
    let taskTimeID = (Date.now()).toString();
    let options: SetOptions = {
      key: task,
      value: taskTimeID
    };
    await Preferences.set(options).then(()=> {
      // console.log("set new task: " + task);
    })
  }
}