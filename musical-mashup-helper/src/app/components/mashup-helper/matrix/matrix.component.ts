import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/artist.model';
import { Song } from 'src/app/models/song.model';
import { Tonality } from 'src/app/models/tonality.enum';
import { ArtistService } from 'src/app/services/artist.service';
import { FiltersService } from 'src/app/services/filters.service';
import { SongService } from 'src/app/services/song.service';
import { MatDialog } from '@angular/material/dialog';
import { AddSongDialogComponent } from '../../songs/add-song-dialog/add-song-dialog.component';
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
              private artistService: ArtistService,
              public filtersService: FiltersService,
              private dialog: MatDialog) {

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
        if(this.filtersService.idSelectedArtists == null){
          this.filtersService.initializeArtists(artists);
        }
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

  openEditDialog(id: string, i: number, j: number, k: number){
    const dialogRef = this.dialog.open(AddSongDialogComponent, {
      data: {
        id: id
      }
    });

    dialogRef.afterClosed().subscribe(
      (song: Song) => {
        if(song){
          //Only visual update
          const copy = this.songs.slice();
          copy[i][j][k] = song;
          this.songs = copy;
        }
      }
    )
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
