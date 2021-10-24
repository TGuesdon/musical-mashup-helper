import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder,
              private artistService: ArtistService) { }

  ngOnInit(): void {
    this.initForm();
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
    if(this.artist){
      //Edit artist
    }else{
      //Add new artist
      let artist = new Artist(this.artistForm.value.name,
                              this.artistForm.value.color);

      this.artistService.addArtist(artist);
    }
  }

}
