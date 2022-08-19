import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/schema/user.schema';
import { UserService } from 'src/app/services/api/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  uid: string;
  loading = false;

  constructor(
    private router: Router,
    public authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.authService.afAuth.onAuthStateChanged(async (user) => {
      if (user) {
        this.uid = user.uid;
        const userData: User = await this.userService.getUser(user.uid);
        if (userData.square && userData.hotelName && userData.domain) {
          this.loading = false;
        } else {
          this.router.navigate(['onboarding']);
        }
      }
      //   this.loading = false;
      //   this.route.queryParams.subscribe(async (params) => {
      //     console.log(params);
      //     this.code = params['code'];
      //     this.response_type = params['response_type'];
      //     this.state = params['state'];
      //     console.log(this.code, this.response_type, this.state);
      //     if (params['code']) {
      //       const userResponse = await this.oAuthService.callback(user.uid, {
      //         code: params['code'],
      //         response_type: params['response_type'],
      //       });
      //       this.router.navigate(['onboarding']);
      //     }
      //   });
      // } else {
      //   // No user is signed in.
      // }
    });
  }
}
