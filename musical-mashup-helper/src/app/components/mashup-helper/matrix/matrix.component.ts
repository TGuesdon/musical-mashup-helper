import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/models/song.model';
import { Tonality } from 'src/app/models/tonality.enum';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})
export class MatrixComponent implements OnInit {

  public static TONALITY_NUMBER : number = Object.keys(Tonality).length / 2;
  public min_bpm : number = 70;
  public max_bpm : number = 180;

  /**
   * Variable used by the html table
   */
  public tonalities = Object.values(Tonality).filter(value => typeof value === 'string');

  /**
   * songs[Tonality][BPM]
   */
  public songs : Array<Array<Array<Song>>>;
  public songsLoaded: boolean = false;

  constructor(private songService: SongService) {

  }

  ngOnInit(): void {
    this.initializeMatrix();
    this.songService.getAllSongs().then(
      (songs : Song[]) => {
        this.fillMatrix(songs);
        this.songsLoaded = true;
      }
    )
  }

  fillMatrix(songs : Song[]){
    songs.forEach((s : Song) => {
      this.songs[s.bpm - this.min_bpm][Tonality[s.tonality]].push(s);
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

}
