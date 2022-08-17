import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  url: string;
  constructor() {
    const state = Md5.hashStr(Date.now().toString());
    this.url =
      environment.squareBasePath +
      `/oauth2/authorize?client_id=${environment.SQ_APPLICATION_ID}&` +
      `response_type=code&` +
      `scope=${environment.squareScopes.join('+')}` +
      `&state=` +
      state;
  }

  ngOnInit(): void {}
}
