import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { OauthService } from 'src/app/services/api/oauth.service';
import { AuthService } from 'src/app/services/auth.service';
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
  loading: boolean;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private oAuthService: OauthService
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

  async ngOnInit() {
    this.authService.afAuth.onAuthStateChanged((user) => {
      this.loading = false;
      if (user) {
        this.route.queryParams.subscribe(async (params) => {
          console.log(params);
          this.code = params['code'];
          this.response_type = params['response_type'];
          this.state = params['state'];
          console.log(this.code, this.response_type, this.state);
          if (params['code']) {
            const userResponse = await this.oAuthService.callback(user.uid, {
              code: params['code'],
              response_type: params['response_type'],
            });
            console.log('yeet', userResponse);
          }
        });
      } else {
        // No user is signed in.
      }
    });
  }
}
