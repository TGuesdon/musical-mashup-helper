import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Song } from 'src/app/models/song.model';
import { ArtistService } from 'src/app/services/artist.service';
import { ControlsService } from 'src/app/services/controls.service';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-compatible-song',
  templateUrl: './compatible-song.component.html',
  styleUrls: ['./compatible-song.component.scss']
})
export class CompatibleSongComponent implements OnInit {

  private compatible_songs: Song[];
  public cs_by_artists: Map<string, Song[]>;

  public artists_name: Map<string, string>;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public songService: SongService,
              public controlsService: ControlsService,
              public artistService: ArtistService) { }

  ngOnInit(): void {
    this.artistService.getArtistIDNameMap().then(
      (map: Map<string, string>) => {
        this.artists_name = map;
      }
    )

    this.songService.getBpmCompatibleSongs(this.data.song.bpm, 20, this.controlsService.min_bpm, this.controlsService.max_bpm).then(
      (songs: Song[]) => {
        this.compatible_songs = this.songService.filterTonalityCompatibleSongs(this.data.song, songs);
        this.storeSongInMapByArtist(this.compatible_songs);
      }
    )
  }

  storeSongInMapByArtist(songs: Song[]){
    let tmp = new Map<string, Song[]>()
    songs.forEach(
      (s : Song) => {
        if(tmp.has(s.artist)){
          tmp.get(s.artist).push(s);
        }else{
          tmp.set(s.artist, [s]);
        }
      }
    );
    this.cs_by_artists = tmp;
  }

}
