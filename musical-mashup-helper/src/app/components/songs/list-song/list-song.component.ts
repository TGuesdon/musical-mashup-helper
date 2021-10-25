import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Artist } from 'src/app/models/artist.model';
import { Song } from 'src/app/models/song.model';
import { ArtistService } from 'src/app/services/artist.service';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.component.html',
  styleUrls: ['./list-song.component.scss']
})
export class ListSongComponent implements OnInit {

  public songs: Song[];
  public songsSubscription: Subscription;

  public displayedColumns: string[] = ['name', 'artist', 'bpm', 'tonality', 'edit'];

  public artists_name: Map<string, string>;

  constructor(
    private songService: SongService,
    private artistService: ArtistService
  ) { }

  ngOnInit(): void {
    this.songService.getAllSongsObservable();

    this.songsSubscription = this.songService.songsSubject.subscribe(
      (songs: Song[]) => {
        this.songs = songs;
      }
    )

    this.artistService.getArtistIDNameMap().then(
      (names: Map<string, string>) => {
        this.artists_name = names;
      }
    )
  }

  ngOnDestroy(): void{
    this.songsSubscription.unsubscribe();
  }

}
