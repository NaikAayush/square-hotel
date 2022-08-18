import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Md5 } from 'ts-md5';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/api/user.service';
import { User } from 'src/app/schema/user.schema';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  url: string;
  constructor(
    public auth: AngularFireAuth,
    public authService: AuthService,
    private userService: UserService
  ) {
    const state = Md5.hashStr(Date.now().toString());
    this.url =
      environment.squareBasePath +
      `/oauth2/authorize?client_id=${environment.SQ_APPLICATION_ID}&` +
      `response_type=code&` +
      `scope=${environment.squareScopes.join('+')}` +
      `&state=` +
      state;
  }

  ngOnInit(): void {
    console.log(this.auth.user);
  }

  async login(): Promise<any> {
    const credential = await this.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
    if (credential.user != null) {
      const user: firebase.User = credential.user;
      if (user.email != null) {
        const data: User = {
          _id: user.uid,
          email: user.email,
        };
        return await this.userService.createUser(data);
      }
    }
  }
  logout() {
    this.auth.signOut();
  }
}
