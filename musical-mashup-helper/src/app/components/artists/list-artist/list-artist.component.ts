import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Artist } from 'src/app/models/artist.model';
import { ArtistService } from 'src/app/services/artist.service';
import { WarningDeleteComponent } from '../../utils/warning-delete/warning-delete.component';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-artist',
  templateUrl: './list-artist.component.html',
  styleUrls: ['./list-artist.component.scss']
})
export class ListArtistComponent implements OnInit {

  public artists: Artist[];
  public artistsSubscription: Subscription;

  public displayedColumns: string[] = ['name', 'color', 'edit'];

  constructor(
    private artistService: ArtistService,
    private changeDetectorRefs: ChangeDetectorRef,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.artistService.getAllArtistsObservable();

    this.artistsSubscription = this.artistService.artistsSubject.subscribe(
      (artists: Artist[]) => {
        this.artists = artists;
        this.changeDetectorRefs.detectChanges();
      }
    )
  }

  ngOnDestroy(): void {
    this.artistsSubscription.unsubscribe();
  }

  public openDeleteWarning(id: string){
    const dialogRef = this.dialog.open(WarningDeleteComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.artistService.deleteArtist(id);
      }
    });
  }

}
