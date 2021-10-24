import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MashupHelperComponent } from './components/mashup-helper/mashup-helper.component';
import { AddSongComponent } from './components/songs/add-song/add-song.component';
import { AddArtistComponent } from './components/artists/add-artist/add-artist.component';
import { MatrixComponent } from './components/mashup-helper/matrix/matrix.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * Angular Material
 */
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatSnackBarModule} from '@angular/material/snack-bar'; 

@NgModule({
  declarations: [
    AppComponent,
    MashupHelperComponent,
    AddSongComponent,
    AddArtistComponent,
    MatrixComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
