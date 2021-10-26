import { Injectable } from '@angular/core';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth = false;

  constructor() { }

    signIn(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        // Sign in
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          (auth: UserCredential) => {
            this.isAuth = true;
            resolve(true);
          },
          (error) => {
            reject('Erreur lors de la connexion, vérifiez votre identifiant et votre mot de passe.');
          }
        );
      }
    );
  }
}
