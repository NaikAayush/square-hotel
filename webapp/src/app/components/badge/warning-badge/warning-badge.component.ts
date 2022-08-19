import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-warning-badge',
  templateUrl: './warning-badge.component.html',
  styleUrls: ['./warning-badge.component.css'],
})
export class WarningBadgeComponent implements OnInit {
  @Input() class = 'h-5 w-5';
  constructor() {}

  ngOnInit(): void {}
}
