import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { Rooms } from 'src/app/schema/user.schema';
import { RoomsComponent } from 'src/app/screens/dashboard/rooms/rooms.component';
import { openCloseAnimation } from 'src/app/services/animation.service';
import { UserService } from 'src/app/services/api/user.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.css'],
  animations: [openCloseAnimation],
})
export class RoomItemComponent implements OnInit {
  @Input() room: Rooms;
  @Input() uid: string;
  toastTitle: string;
  toastBody: string;
  toastSuccess: boolean;

  constructor(
    private userService: UserService,
    public storeService: StoreService,
    private roomComponent: RoomsComponent
  ) {}

  ngOnInit() {}

  async delete() {
    this.storeService.roomsHandleLoading = true;
    const res = await this.userService.deleteRoom(this.uid, this.room.itemId);
    console.log(res);
    if (res.message == 'deleted') {
      this.storeService.roomsHandleSuccess = true;
      this.storeService.roomsHandleTitle = 'Room Deleted';
      this.storeService.toast = true;
      this.storeService.roomsHandleLoading = false;
      this.roomComponent.ngOnInit();
    } else {
      this.storeService.roomsHandleSuccess = false;
      this.storeService.roomsHandleTitle = 'Room not Deleted';
      this.storeService.roomsHandleLoading = false;
      this.storeService.toast = true;
    }
    this.storeService.toast = true;
  }
}
