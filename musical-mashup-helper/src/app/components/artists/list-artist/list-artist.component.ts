import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Artist } from 'src/app/models/artist.model';
import { ArtistService } from 'src/app/services/artist.service';

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
    private changeDetectorRefs: ChangeDetectorRef
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

}
