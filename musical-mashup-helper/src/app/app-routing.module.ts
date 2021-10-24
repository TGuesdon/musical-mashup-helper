import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MashupHelperComponent } from './components/mashup-helper/mashup-helper.component';

const routes: Routes = [
  { path: '', component: MashupHelperComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
