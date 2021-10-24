import { Injectable } from '@angular/core';
import { Artist } from '../models/artist.model';

import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor() { }

  private static reference = '/artists/';

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
          data.forEach((c) => {
            artists.push(c.val() as Artist);
          });
          resolve(artists);
        },
        (error) => {
          reject(error);
        });
    });
  }
}
