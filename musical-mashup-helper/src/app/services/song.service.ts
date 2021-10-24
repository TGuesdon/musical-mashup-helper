import { Injectable } from '@angular/core';
import { Song } from '../models/song.model';

import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import DataSnapshot = firebase.database.DataSnapshot;

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

  public getAllSongs(){
    const ref = SongService.reference;

    return new Promise((resolve, reject) => {
      firebase.database().ref(ref).once('value').then(
        (data: DataSnapshot) => {
          const songs: Song[] = [];
          data.forEach((c) => {
            songs.push(c.val() as Song);
          });
          resolve(songs);
        },
        (error) => {
          reject(error);
        });
    });
  }

}
