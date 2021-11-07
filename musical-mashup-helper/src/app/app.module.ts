import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MashupHelperComponent } from './components/mashup-helper/mashup-helper.component';
import { AddSongComponent } from './components/songs/add-song/add-song.component';
import { AddArtistComponent } from './components/artists/add-artist/add-artist.component';
import { MatrixComponent } from './components/mashup-helper/matrix/matrix.component';
import { HeaderComponent } from './components/header/header.component'; 
import { ListSongComponent } from './components/songs/list-song/list-song.component';
import { ListArtistComponent } from './components/artists/list-artist/list-artist.component';
import { WarningDeleteComponent } from './components/utils/warning-delete/warning-delete.component';
import { AuthComponent } from './components/utils/auth/auth.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * Angular Material
 */
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AddSongDialogComponent } from './components/songs/add-song-dialog/add-song-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MashupHelperComponent,
    AddSongComponent,
    AddArtistComponent,
    MatrixComponent,
    HeaderComponent,
    ListSongComponent,
    ListArtistComponent,
    WarningDeleteComponent,
    AuthComponent,
    AddSongDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
