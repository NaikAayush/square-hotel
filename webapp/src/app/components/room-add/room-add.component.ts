import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnimationService, slide } from 'src/app/services/animation.service';

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.component.html',
  styleUrls: ['./room-add.component.css'],
  animations: [slide],
})
export class RoomAddComponent implements OnInit {
  constructor(public animationService: AnimationService) {}

  ngOnInit(): void {}

  closeAddRoom() {
    setTimeout(() => {
      this.animationService.addRoom = false;
    }, 200);
  }
}
