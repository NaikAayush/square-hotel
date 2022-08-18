import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../schema/user.schema'; // optional

import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from './api/user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: any;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(async (user) => {
        // Logged in
        if (user) {
          console.log(await this.userService.getUser(user.uid));
          return await this.userService.getUser(user.uid);
        } else {
          // Logged out
          console.log(of(null));
          return of(null);
        }
      })
    );
  }
}
