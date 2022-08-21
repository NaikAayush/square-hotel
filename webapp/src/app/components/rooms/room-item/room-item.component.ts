import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { Rooms } from 'src/app/schema/user.schema';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.css'],
})
export class RoomItemComponent implements OnInit {
  @Input() room: Rooms;
  image: any;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    console.log(this.room);
    this.image = this.sanitizer.bypassSecurityTrustUrl(
      `url(${this.room.roomCoverPhoto})`
    );
    this.image = this.image.changingThisBreaksApplicationSecurity;
    console.log(this.image);
  }
}
