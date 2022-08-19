import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../schema/user.schema'; // optional

import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { UserService } from './api/user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  uid: string;
  loading = false;

  constructor(
    public afAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router
  ) {}

  async login(): Promise<any> {
    this.loading = true;
    const credential = await this.afAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
    if (credential.user) {
      const user: firebase.User = credential.user;
      const data: User = {
        _id: user.uid,
        email: user.email !== null ? user.email : '',
        photoURL: user.photoURL !== null ? user.photoURL : '',
        displayName: user.displayName !== null ? user.displayName : '',
      };
      this.loading = false;
      return await this.userService.createUser(data);
    }
  }
  logout() {
    this.afAuth.signOut();
    this.router.navigate(['']);
  }
}
