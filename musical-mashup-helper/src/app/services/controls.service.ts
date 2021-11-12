import { Injectable } from '@angular/core';
import { Artist } from '../models/artist.model';
import { Song } from '../models/song.model';

@Injectable({
  providedIn: 'root'
})
export class ControlsService {

  public idSelectedArtists: string[];
  public selected: Map<string, {rapped: boolean, sung: boolean}>;
  public editMode: boolean = true;

  public min_bpm : number = 80;
  public max_bpm : number = 180;

  constructor() { }

  initializeArtists(artists){
    this.selected = new Map<string, {rapped: boolean, sung: boolean}>();
    this.selectArtists(artists);
    console.log(this.selected);
  }

  selectArtists(artists){
    
    // artists.forEach(
    //   (a : Artist) => {
    //     if(this.idSelectedArtists.indexOf(a.id) == -1){
    //       this.idSelectedArtists.push(a.id);
    //     }
    //   }
    // )
    artists.forEach(
      (a: Artist) => {
        this.selected.set(a.id, {rapped:true, sung: true});
      }
    );
  }

  deselectAllArtists(){
    //this.selected = new Map<string, {rapped: boolean, sung: boolean}>();
    this.selected.forEach(
      (value, key) => {
        this.selected.set(key, {rapped: false, sung: false});
      }
    )
  }

  changeArtist(id: string){
    if(this.selected.has(id)){
      this.selected.set(id, {
        rapped: !this.selected.get(id).rapped,
        sung: !this.selected.get(id).sung
      });
    }
  }

  changeArtistRapped(id: string){
    if(this.selected.has(id)){
      this.selected.set(id, {
        rapped: !this.selected.get(id).rapped,
        sung: this.selected.get(id).sung
      });
    }
  }

  changeArtistSung(id: string){
    if(this.selected.has(id)){
      this.selected.set(id, {
        rapped: this.selected.get(id).rapped,
        sung: !this.selected.get(id).sung
      });
    }
  }

  isSelected(song: Song){
    if(this.selected.has(song.artist)){
      if(this.selected.get(song.artist).rapped && song.rapped){
        return true;
      }

      if(this.selected.get(song.artist).sung && !song.rapped){
        return true;
      }
    }

    return false;
  }

  artistsIsSelected(id: string){
    if(this.selected.has(id)){
      return this.selected.get(id).rapped || this.selected.get(id).sung;
    }

    return false;
  }


  switchMode(){
    this.editMode = !this.editMode;
  }

  public getModeLabel() : string{
    return this.editMode ? 'edit' : 'zoom_in';
  }

}
