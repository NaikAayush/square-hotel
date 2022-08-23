import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/schema/user.schema';
import { openCloseAnimation } from 'src/app/services/animation.service';
import { OauthService } from 'src/app/services/api/oauth.service';
import { UserService } from 'src/app/services/api/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';
import { environment } from 'src/environments/environment';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css'],
  animations: [openCloseAnimation],
})
export class OnboardingComponent implements OnInit {
  url: string;
  code: string;
  response_type: string;
  state: string;
  loading: boolean = false;
  square_connected = 'warning';
  square_hotel_name = 'warning';
  square_domain_configured = 'warning';
  hotelName = '';
  domain = '';
  onboarded = false;
  uid: string;
  toastTitle: string;
  toastBody: string;
  toastSuccess: boolean;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private userService: UserService,
    private oAuthService: OauthService,
    public storeService: StoreService
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
    this.loading = true;
    this.authService.afAuth.onAuthStateChanged(async (user) => {
      if (user) {
        this.uid = user.uid;
        const userData: User = await this.userService.getUser(user.uid);

        if (userData.square) {
          this.square_connected = 'success';
        }
        if (userData.hotelName) {
          this.hotelName = userData.hotelName;
          this.square_hotel_name = 'success';
        }
        if (userData.domain) {
          this.domain = userData.domain;
          this.square_domain_configured = 'success';
        }
        this.checkStatus(userData);

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
            this.router.navigate(['onboarding']);
            this.ngOnInit();
            this.storeService.toast = true;
            this.toastSuccess = true;
            this.toastTitle = 'Square account connected';
            this.loading = false;
          } else {
            this.loading = false;
          }
        });
      } else {
        // No user is signed in.
      }
    });
  }

  checkStatus(userData: User) {
    if (userData?.square && userData?.hotelName && userData?.domain) {
      console.log('enabled');
      this.onboarded = true;
    }
  }

  async saveHotel() {
    this.loading = true;
    const hotelRes: any = await this.userService.updateUser(
      this.uid,
      'hotelName',
      this.hotelName
    );
    this.checkStatus(hotelRes['hotelName']);
    this.square_hotel_name = 'success';
    this.loading = false;
    this.storeService.toast = true;
    this.toastSuccess = true;
    this.toastTitle = 'Hotel name updated';
    console.log(hotelRes);
  }

  async saveDomain() {
    this.loading = true;
    const hotelRes: any = await this.userService.updateUser(
      this.uid,
      'domain',
      this.domain
    );
    this.checkStatus(hotelRes['existingUser']);
    this.square_domain_configured = 'success';
    this.storeService.toast = true;
    this.toastSuccess = true;
    this.toastTitle = 'Domain name updated';
    this.loading = false;
    console.log(hotelRes);
  }
}
