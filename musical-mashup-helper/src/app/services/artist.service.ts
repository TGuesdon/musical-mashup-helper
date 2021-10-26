import { Injectable } from '@angular/core';
import { Artist } from '../models/artist.model';

import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import DataSnapshot = firebase.database.DataSnapshot;
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor() { }

  private static reference = '/artists/';

  public artists: Artist[] = [];
  public artistsSubject: BehaviorSubject<Artist[]> = new BehaviorSubject<Artist[]>(this.artists);

  public addArtist(artist: Artist){
    const ref = ArtistService.reference;

    if(!artist.id){
      artist.id = firebase.database().ref(ref).push().key;
    }

    return firebase.database().ref(ref + artist.id).set(artist);
  }

  public getAllArtists(){
    const ref = ArtistService.reference;

    return new Promise((resolve, reject) => {
      firebase.database().ref(ref).once('value').then(
        (data: DataSnapshot) => {
          const artists: Artist[] = [];
          data.forEach((a) => {
            artists.push(a.val() as Artist);
          });
          resolve(artists);
        },
        (error) => {
          reject(error);
        });
    });
  }

  public getArtistIDColorMap(){
    const ref = ArtistService.reference;

    return new Promise((resolve, reject) => {
      firebase.database().ref(ref).once('value').then(
        (data: DataSnapshot) => {
          const colors: Map<string, string> = new Map<string,string>();
          data.forEach((a) => {
            let artist = a.val() as Artist;
            colors.set(artist.id, artist.color);
          });
          resolve(colors);
        },
        (error) => {
          reject(error);
        });
    });
  }

  public getArtistIDNameMap(){
    const ref = ArtistService.reference;

    return new Promise((resolve, reject) => {
      firebase.database().ref(ref).once('value').then(
        (data: DataSnapshot) => {
          const colors: Map<string, string> = new Map<string,string>();
          data.forEach((a) => {
            let artist = a.val() as Artist;
            colors.set(artist.id, artist.name);
          });
          resolve(colors);
        },
        (error) => {
          reject(error);
        });
    });
  }

  public getArtist(id: string){
    const ref = ArtistService.reference + id;

    return new Promise((resolve, reject) => {
      firebase.database().ref(ref).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          },
          (error) => reject(error)
        );
    });
  }

  /** Synchronized */
  public emitArtists(){
    this.artistsSubject.next(this.artists);
  }

  public getAllArtistsObservable(){
    const ref = ArtistService.reference;

    return firebase
    .database()
    .ref(ref)
    .on('value', (data: DataSnapshot) => {
      const artists: Artist[] = [];
      data.forEach((c) => {
        artists.push(c.val() as Artist);
      });
      this.artists = artists;
      this.emitArtists();
    });
  }

}
