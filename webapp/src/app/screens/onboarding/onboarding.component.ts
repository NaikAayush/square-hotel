import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css'],
})
export class OnboardingComponent implements OnInit {
  url: string;
  code: string;
  response_type: string;
  state: string;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const state = Md5.hashStr(Date.now().toString());
    this.url =
      environment.squareBasePath +
      `/oauth2/authorize?client_id=${environment.SQ_APPLICATION_ID}&` +
      `response_type=code&` +
      `scope=${environment.squareScopes.join('+')}` +
      `&state=` +
      state;
    this.cookieService.set('Auth_State', state, Date.now() + 300000);
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.code = params['code'];
      this.response_type = params['response_type'];
      this.state = params['state'];
      console.log(this.code, this.response_type, this.state);
      if (params['code']) {
        console.log('yeet');
      }
    });
  }
}
