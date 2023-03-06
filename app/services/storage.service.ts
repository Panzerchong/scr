import { EventEmitter, Injectable, Output } from '@angular/core';
import { Preferences, SetOptions, GetOptions, RemoveOptions, KeysResult } from '@capacitor/preferences';
import { StanfordSleepinessData } from '../../app/data/stanford-sleepiness-data';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
}