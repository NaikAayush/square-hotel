import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fail-badge',
  templateUrl: './fail-badge.component.html',
  styleUrls: ['./fail-badge.component.css'],
})
export class FailBadgeComponent implements OnInit {
  @Input() class = 'h-5 w-5';
  constructor() {}

  ngOnInit(): void {}
}
