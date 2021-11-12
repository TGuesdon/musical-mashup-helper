import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Artist } from 'src/app/models/artist.model';

import { Song } from 'src/app/models/song.model';

import { Tonality } from 'src/app/models/tonality.enum';
import { ArtistService } from 'src/app/services/artist.service';
import { SongService } from 'src/app/services/song.service';

import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { AddSongDialogComponent } from '../add-song-dialog/add-song-dialog.component';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit {

  public songForm : FormGroup;
  public song: Song;

  public tonalities = Object.values(Tonality).filter(value => typeof value === 'string');
  public artists : Artist[];

  private songSubscription: Subscription;

  @Input() id: string;
  @Input() dialogRef: MatDialogRef<AddSongDialogComponent>;

  constructor(private formBuilder : FormBuilder,
              private songService: SongService,
              private artisteService: ArtistService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(this.id != null){
      this.songService.getSong(this.id).then(
        (song: Song) => {
          this.song = song;
          this.artisteService.getAllArtists().then(
            (artists: Artist[]) => {
              this.artists = artists;
              this.initForm();
            }
          )
        }
      )
    }else{
      this.artisteService.getAllArtists().then(
        (artists: Artist[]) => {
          this.artists = artists;
          this.initForm();
        }
      )
    }
  }

  initForm(){
    this.songForm = this.formBuilder.group({
      name: [
        this.song ? this.song.name : '',
        Validators.required
      ],
      artist: [
        this.song ? this.song.artist : '',
        Validators.required
      ],
      bpm: [
        this.song ? this.song.bpm : '',
        Validators.required
      ],
      tonality: [
        this.song ? this.song.tonality: '',
        Validators.required
      ],
      prod: [
        this.song ? this.song.prod: null,
      ],
      rapped: [
        this.song ? this.song.rapped: null,
      ]
    });
  }

  onAddSong(){

    //Add new song
    let song = new Song(this.songForm.value.name, 
                        this.songForm.value.artist, 
                        this.songForm.value.bpm,
                        this.songForm.value.tonality,
                        this.songForm.value.prod,
                        this.songForm.value.rapped);

    //Edit song
    if(this.song){
      song.setId(this.song.id);
    }

    this.songService.addSong(song).then(() =>{
      this.songForm.reset();
      if(this.song){
        this.songService.getSong(this.song.id).then(
          (song: Song) => {
            this.song = song;
            this.initForm();
            this._snackBar.open("Song edited", "Ok");
          });
      }else{
        this._snackBar.open("Song added", "Ok");
      }

      if(this.dialogRef != null){
        //If this is called as a dialog
        this.dialogRef.close(song);
      }
    });

    
  }

}
