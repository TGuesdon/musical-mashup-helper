import { Injectable } from '@angular/core';
import { Artist } from '../models/artist.model';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  public idSelectedArtists: string[];

  constructor() { }

  initializeArtists(artists){
    this.idSelectedArtists = [];
    this.selectArtists(artists);
  }

  selectArtists(artists){
    artists.forEach(
      (a : Artist) => {
        if(this.idSelectedArtists.indexOf(a.id) == -1){
          this.idSelectedArtists.push(a.id);
        }
      }
    )
  }

  deselectAllArtists(){
    this.idSelectedArtists = [];
  }

  changeArtist(id: string){
    let index = this.idSelectedArtists.indexOf(id);
    if(index > -1){
      this.idSelectedArtists.splice(index, 1);
    }else{
      this.idSelectedArtists.push(id);
    }
  }


}
