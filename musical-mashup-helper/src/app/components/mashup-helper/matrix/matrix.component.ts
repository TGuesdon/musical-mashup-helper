import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/artist.model';
import { Song } from 'src/app/models/song.model';
import { Tonality } from 'src/app/models/tonality.enum';
import { ArtistService } from 'src/app/services/artist.service';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})
export class MatrixComponent implements OnInit {

  public static TONALITY_NUMBER : number = Object.keys(Tonality).length / 2;
  public min_bpm : number = 80;
  public max_bpm : number = 180;

  /**
   * Variable used by the html table
   */
  public tonalities = Object.values(Tonality).filter(value => typeof value === 'string');

  /**
   * songs[Tonality][BPM]
   */
  public songs : Array<Array<Array<Song>>>;
  public dataLoaded: boolean = false;

  public colors: Map<string, string>;
  public artists: Artist[];

  public idSelectedArtist: String[] = [];

  constructor(private songService: SongService,
                      private artistService: ArtistService) {

  }

  ngOnInit(): void {
    this.initializeMatrix();
    this.songService.getAllSongs().then(
      (songs : Song[]) => {
        this.fillMatrix(songs);
        this.dataLoaded = true;
      }
    )

    this.artistService.getArtistIDColorMap().then(
      (colors: Map<string, string>) => {
        this.colors = colors;
      }
    )

    this.artistService.getAllArtists().then(
      (artists: Artist[]) => {
        this.artists = artists;
        this.selectAllArtists();
      }
    )
  }

  fillMatrix(songs : Song[]){
    songs.forEach((s : Song) => {
      let round_bpm = Math.round(s.bpm);
      this.songs[round_bpm - this.min_bpm][Tonality[s.tonality]].push(s);
    });
  }

  initializeMatrix(){
    this.songs = new Array<Array<Array<Song>>>();
    for(let i : number = 0; i < this.max_bpm - this.min_bpm; i++){
      this.songs[i] = new Array<Array<Song>>();
      for(let j : number = 0; j < MatrixComponent.TONALITY_NUMBER; j++){
        this.songs[i][j] = new Array<Song>();
      }
    }
  }

  selectAllArtists(){
    this.artists.forEach(
      (a : Artist) => {
        if(this.idSelectedArtist.indexOf(a.id) == -1){
          this.idSelectedArtist.push(a.id);
        }
      }
    )
  }

  deselectAllArtists(){
    this.idSelectedArtist = [];
  }

  onClickArtist(id: string){
    let index = this.idSelectedArtist.indexOf(id);
    if(index > -1){
      this.idSelectedArtist.splice(index, 1);
    }else{
      this.idSelectedArtist.push(id);
    }
  }

  isInt(value) {
    var x;
    if (isNaN(value)) {
      return false;
    }
    x = parseFloat(value);
    return (x | 0) === x;
  }

}
