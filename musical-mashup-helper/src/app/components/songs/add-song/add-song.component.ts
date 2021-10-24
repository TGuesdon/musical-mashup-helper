import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Artist } from 'src/app/models/artist.model';

import { Song } from 'src/app/models/song.model';

import { Tonality } from 'src/app/models/tonality.enum';
import { ArtistService } from 'src/app/services/artist.service';
import { SongService } from 'src/app/services/song.service';

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

  constructor(private formBuilder : FormBuilder,
              private songService: SongService,
              private artisteService: ArtistService) { }

  ngOnInit(): void {
    this.artisteService.getAllArtists().then(
      (artists: Artist[]) => {
        this.artists = artists;
        this.initForm();
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
    if(this.song){
      //Edit song

    }else{
      //Add new song
      let song = new Song(this.songForm.value.name, 
                          this.songForm.value.artist, 
                          this.songForm.value.bpm,
                          this.songForm.value.tonality);

      this.songService.addSong(song);
    }
    
  }

}
