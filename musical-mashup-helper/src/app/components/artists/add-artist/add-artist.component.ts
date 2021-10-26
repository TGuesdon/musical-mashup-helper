import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Artist } from 'src/app/models/artist.model';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.scss']
})
export class AddArtistComponent implements OnInit {

  public artistForm: FormGroup;
  public artist: Artist;

  public artistSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private artistService: ArtistService,
              private route: ActivatedRoute,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initForm();

    this.artistSubscription = this.route.queryParams.subscribe(
      (params) => {
        this.artistService.getArtist(params['id']).then(
          (artist: Artist) => {
            this.artist = artist;
            this.initForm();
          }
        )
      }
    )
  }

  ngOnDestroy(): void{
    this.artistSubscription.unsubscribe();
  }

  initForm(){
    this.artistForm = this.formBuilder.group({
      name: [
        this.artist ? this.artist.name : '',
        Validators.required
      ],
      color: [
        this.artist ? this.artist.color : '',
        Validators.required
      ]
    })
  }

  onAddArtist(){
    let artist = new Artist(this.artistForm.value.name,
                            this.artistForm.value.color);

    if(this.artist){
      artist.setId(this.artist.id);
    }

    this.artistService.addArtist(artist).then(
      () => {
        this.artistForm.reset();
        if(this.artist){
          this.artistService.getArtist(this.artist.id).then(
            (artist: Artist) => {
              this.artist = artist;
              this.initForm();
              this._snackBar.open("Artist edited", "Ok");
            }
          )
        }else{
          this._snackBar.open("Artist added", "Ok");
        }
      }
    );
    
  }

}
