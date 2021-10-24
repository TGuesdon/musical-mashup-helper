import { Component } from '@angular/core';

import firebase from 'firebase/compat/app';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'musical-mashup-helper';

  constructor() {
    firebase.initializeApp(environment.firebaseConfig);
  }

}
