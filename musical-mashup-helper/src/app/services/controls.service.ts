import { Injectable } from '@angular/core';
import { Artist } from '../models/artist.model';

@Injectable({
  providedIn: 'root'
})
export class ControlsService {

  public idSelectedArtists: string[];
  public editMode: boolean = true;

  public min_bpm : number = 80;
  public max_bpm : number = 180;

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

  switchMode(){
    this.editMode = !this.editMode;
  }

  public getModeLabel() : string{
    return this.editMode ? 'edit' : 'zoom_in';
  }

}
