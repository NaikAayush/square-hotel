import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/api/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from 'square';
import { StoreService } from 'src/app/services/store.service';
import { openCloseAnimation } from 'src/app/services/animation.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  host: {
    class: 'w-full height-class',
  },
  animations: [openCloseAnimation],
})
export class SettingsComponent implements OnInit {
  domain = 'pearl';
  hotel = 'pearl';
  locationList: Location[];
  selectedLocation: Location;
  loading = false;
  uid: string;
  toastTitle: string;
  toastBody: string;
  toastSuccess: boolean;

  constructor(
    public authService: AuthService,
    private userService: UserService,
    public storeService: StoreService
  ) {}

  ngOnInit() {
    console.log(this.loading);
    this.loading = true;
    this.authService.afAuth.onAuthStateChanged(async (user) => {
      if (user) {
        this.uid = user.uid;
        this.locationList = await this.userService.getLocations(user.uid);
        this.selectedLocation = this.locationList[0];
      }
      this.loading = false;
    });
  }

  async saveLocation() {
    this.loading = true;
    const hotelRes: any = await this.userService.updateUser(
      this.uid,
      'locationId',
      this.selectedLocation.id
    );
    this.storeService.toast = true;
    this.toastSuccess = true;
    this.toastTitle = 'Location Updated';
    this.loading = false;
  }
}
