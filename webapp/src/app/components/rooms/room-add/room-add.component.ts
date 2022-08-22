import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/schema/user.schema';
import { RoomsComponent } from 'src/app/screens/dashboard/rooms/rooms.component';
import { UserService } from 'src/app/services/api/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { SpacesService } from 'src/app/services/spaces.service';
import { StoreService } from 'src/app/services/store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.component.html',
  styleUrls: ['./room-add.component.css'],
})
export class RoomAddComponent implements OnInit {
  fileName = '';
  file: File;
  roomForm = new FormGroup({
    roomName: new FormControl(''),
    roomUnits: new FormControl(1),
    roomSize: new FormControl(250),
    bedType: new FormControl(''),
    bedUnits: new FormControl(1),
    roomCoverPhoto: new FormControl(''),
    roomDescription: new FormControl(''),
    roomPrice: new FormControl(),
  });
  loading = false;

  bedTypes = ['King', 'Queen', 'Twin'];
  photo: string | ArrayBuffer;

  constructor(
    public storeService: StoreService,
    private spacesService: SpacesService,
    private userService: UserService,
    public authService: AuthService,
    private room: RoomsComponent
  ) {}

  ngOnInit(): void {}

  onFileChange(event: any) {
    this.fileName = event.target.files[0].name;
    this.file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e) => (this.photo = reader.result);

    reader.readAsDataURL(this.file);
  }

  async submit() {
    this.loading = true;
    console.log(this.roomForm.value);
    const bucketParams = {
      Bucket: 'square-hotel',
      Key: this.fileName,
      Body: this.file,
      ACL: 'public-read',
    };
    await this.spacesService.uploadObject(bucketParams);
    const fileURL = `${environment.spacesConfig.endpointWithSpace}/${this.fileName}`;
    console.log(fileURL);
    this.roomForm.patchValue({ roomCoverPhoto: fileURL });
    console.log(this.roomForm);
    this.authService.afAuth.onAuthStateChanged(async (user) => {
      if (user) {
        await this.userService.handleRoom(user.uid, this.roomForm.value);
      }
    });
    this.loading = false;
    this.room.ngOnInit();
    this.storeService.roomsAddScreenVisible = false;
  }
}
