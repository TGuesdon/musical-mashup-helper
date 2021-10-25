import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Song } from 'src/app/models/song.model';
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

  constructor(
    private songService: SongService
  ) { }

  ngOnInit(): void {
    this.songService.getAllSongsObservable();

    this.songsSubscription = this.songService.songsSubject.subscribe(
      (songs: Song[]) => {
        this.songs = songs;
      }
    )
  }

  ngOnDestroy(): void{
    this.songsSubscription.unsubscribe();
  }

}
