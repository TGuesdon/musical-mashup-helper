import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Artist } from 'src/app/models/artist.model';

import { Song } from 'src/app/models/song.model';

import { Tonality } from 'src/app/models/tonality.enum';
import { ArtistService } from 'src/app/services/artist.service';
import { SongService } from 'src/app/services/song.service';

import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

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

  constructor(private route: ActivatedRoute,
              private formBuilder : FormBuilder,
              private songService: SongService,
              private artisteService: ArtistService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.songSubscription = this.route.queryParams.subscribe(
      params => {
        this.songService.getSong(params['id']).then(
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
      }
    )
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
      ]
    });
  }

  onAddSong(){
 
    //Add new song
    let song = new Song(this.songForm.value.name, 
                        this.songForm.value.artist, 
                        this.songForm.value.bpm,
                        this.songForm.value.tonality);

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
    });

    
  }

}
