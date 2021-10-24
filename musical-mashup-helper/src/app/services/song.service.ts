import { Injectable } from '@angular/core';
import { Song } from '../models/song.model';

import firebase from 'firebase/compat/app';
import "firebase/compat/database";

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor() {

  }

  private static reference = '/songs/';

  public addSong(song: Song){
    const ref = SongService.reference;

    if(!song.id){
      song.id = firebase.database().ref(ref).push().key;
    }

    return firebase.database().ref(ref + song.id).set(song);
  }

}
