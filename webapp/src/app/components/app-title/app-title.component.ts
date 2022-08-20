import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-title',
  templateUrl: './app-title.component.html',
  styleUrls: ['./app-title.component.css'],
})
export class AppTitleComponent implements OnInit {
  @Input() title = '';
  constructor() {}

  ngOnInit(): void {}
}
