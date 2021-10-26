import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddArtistComponent } from './components/artists/add-artist/add-artist.component';
import { MashupHelperComponent } from './components/mashup-helper/mashup-helper.component';
import { AddSongComponent } from './components/songs/add-song/add-song.component';
import { ListSongComponent } from './components/songs/list-song/list-song.component';
import { ListArtistComponent } from './components/artists/list-artist/list-artist.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthComponent } from './components/utils/auth/auth.component';

const routes: Routes = [
  { path: '', component: MashupHelperComponent, canActivate: [AuthGuardService] },
  { path: 'add-song', component: AddSongComponent, canActivate: [AuthGuardService] },
  { path: 'add-artist', component: AddArtistComponent, canActivate: [AuthGuardService] },
  { path: 'list-song', component: ListSongComponent, canActivate: [AuthGuardService] },
  { path: 'list-artist', component: ListArtistComponent, canActivate: [AuthGuardService] },
  { path: 'auth', component:AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
