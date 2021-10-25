import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddArtistComponent } from './components/artists/add-artist/add-artist.component';

import { MashupHelperComponent } from './components/mashup-helper/mashup-helper.component';
import { AddSongComponent } from './components/songs/add-song/add-song.component';
import { ListSongComponent } from './components/songs/list-song/list-song.component';
import { ListArtistComponent } from './components/artists/list-artist/list-artist.component';

const routes: Routes = [
  { path: '', component: MashupHelperComponent },
  { path: 'add-song', component: AddSongComponent },
  { path: 'add-artist', component: AddArtistComponent },
  { path: 'list-song', component: ListSongComponent },
  { path: 'list-artist', component: ListArtistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
