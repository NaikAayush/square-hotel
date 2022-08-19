import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css'],
})
export class BadgeComponent implements OnInit {
  @Input() class = 'h-5 w-5';
  @Input() type = 'warning';
  constructor() {}

  ngOnInit(): void {}
}
