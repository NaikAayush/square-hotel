import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Md5 } from 'ts-md5';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/api/user.service';
import { User } from 'src/app/schema/user.schema';
import {
  closeAnimation,
  openCloseAnimation,
} from 'src/app/services/animation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [closeAnimation],
})
export class LoginComponent implements OnInit {
  // url: string;
  loading = true;
  isLoggedIn = false;

  constructor(public authService: AuthService) {
    // const state = Md5.hashStr(Date.now().toString());
    // this.url =
    //   environment.squareBasePath +
    //   `/oauth2/authorize?client_id=${environment.SQ_APPLICATION_ID}&` +
    //   `response_type=code&` +
    //   `scope=${environment.squareScopes.join('+')}` +
    //   `&state=` +
    //   state;
  }

  async ngOnInit() {
    this.authService.afAuth.onAuthStateChanged((user) => {
      this.loading = false;
      if (user) {
        this.isLoggedIn = true;
      } else {
        // No user is signed in.
      }
    });
  }
}
