import { Injectable } from '@angular/core';
import { Song } from '../models/song.model';

import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import DataSnapshot = firebase.database.DataSnapshot;
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  public songs: Song[] = [];
  public songsSubject: BehaviorSubject<Song[]> = new BehaviorSubject<Song[]>(this.songs);

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

  public getSong(id: string){
    const ref = SongService.reference + id;

    return new Promise((resolve, reject) => {
      firebase.database().ref(ref).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          },
          (error) => reject(error)
        );
    });
  }

  public getSongFromArtist(id: string){
    const ref = SongService.reference;

    return new Promise((resolve, reject) => {
      firebase.database().ref(ref).once('value').then(
        (data: DataSnapshot) => {
          const songs: Song[] = [];
          data.forEach((c) => {
            if((c.val() as Song).artist == id){
              songs.push(c.val() as Song);
            }
          });
          resolve(songs);
        },
        (error) => {
          reject(error);
        });
    });
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

  /** Synchronized */
  public emitSongs(){
    this.songsSubject.next(this.songs);
  }

  public getAllSongsObservable(){
    const ref = SongService.reference;

    return firebase
    .database()
    .ref(ref)
    .on('value', (data: DataSnapshot) => {
      const songs: Song[] = [];
      data.forEach((c) => {
        songs.push(c.val() as Song);
      });
      this.songs = songs;
      this.emitSongs();
    });
  }

  async deleteSong(id: string){
    let ref = SongService.reference + id;
    return firebase.database().ref(ref).remove();
  }
}
