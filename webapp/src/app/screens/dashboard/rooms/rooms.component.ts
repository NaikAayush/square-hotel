import { Component, OnInit } from '@angular/core';
import {
  AnimationService,
  openCloseAnimation,
  slide,
} from 'src/app/services/animation.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  animations: [openCloseAnimation],
})
export class RoomsComponent implements OnInit {
  constructor(public animationService: AnimationService) {}

  ngOnInit() {}

  handleAddRoomClick() {
    this.animationService.addRoom = !this.animationService.addRoom;
  }
}
