import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Song } from 'src/app/models/song.model';
import { ArtistService } from 'src/app/services/artist.service';
import { SongService } from 'src/app/services/song.service';
import { WarningDeleteComponent } from '../../utils/warning-delete/warning-delete.component';
import { AddSongDialogComponent } from '../add-song-dialog/add-song-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.component.html',
  styleUrls: ['./list-song.component.scss']
})
export class ListSongComponent implements OnInit {

  public songs: Song[];
  public songsSubscription: Subscription;

  public searchString: string = '';
  public dataSource: MatTableDataSource<Song> = new MatTableDataSource<Song>();

  public displayedColumns: string[] = ['name', 'artist', 'bpm', 'tonality', 'action'];

  public artists_name: Map<string, string>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private songService: SongService,
    private artistService: ArtistService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.songService.getAllSongsObservable();

    this.songsSubscription = this.songService.songsSubject.subscribe(
      (songs: Song[]) => {
        this.songs = songs;
        this.dataSource = new MatTableDataSource<Song>(songs);
        this.dataSource.paginator = this.paginator;
        this.dataSource.filter = this.searchString.trim().toLowerCase();
        this.dataSource.filterPredicate = (data, filter: string) => {
          return this.artists_name.get(data.artist).toLowerCase().includes(filter) || data.name.toLowerCase().includes(filter);
        }
      }
    )

    this.artistService.getArtistIDNameMap().then(
      (names: Map<string, string>) => {
        this.artists_name = names;
      }
    )
  }

  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.filter = this.searchString.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter: string) => {
      return this.artists_name.get(data.artist).toLowerCase().includes(filter) || data.name.toLowerCase().includes(filter);
    }
  }

  ngOnDestroy(): void{
    this.songsSubscription.unsubscribe();
  }

  searchStringChange(value){
    this.dataSource.filter = value.trim().toLowerCase();
  }

  public openDeleteWarning(id: string){
    const dialogRef = this.dialog.open(WarningDeleteComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.songService.deleteSong(id);
      }
    });
  }

  public openEditDialog(id: string){
    const dialogRef = this.dialog.open(AddSongDialogComponent, {
      data: {
        id: id
      }
    });
  }

}

