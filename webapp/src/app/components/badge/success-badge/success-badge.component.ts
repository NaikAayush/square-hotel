import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-badge',
  templateUrl: './success-badge.component.html',
  styleUrls: ['./success-badge.component.css'],
})
export class SuccessBadgeComponent implements OnInit {
  @Input() class = 'h-5 w-5';
  constructor() {}

  ngOnInit(): void {}
}
