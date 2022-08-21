import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/schema/user.schema';
import { openCloseAnimation } from 'src/app/services/animation.service';
import { UserService } from 'src/app/services/api/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  animations: [openCloseAnimation],
})
export class RoomsComponent implements OnInit {
  user: User;
  constructor(
    public storeService: StoreService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.authService.afAuth.onAuthStateChanged(async (user) => {
      if (user) {
        this.user = await this.userService.getUser(user.uid);
      }
    });
  }
}
