import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.css'],
})
export class SidebarItemComponent implements OnInit {
  @Input() svg: string;
  @Input() name: string;

  style = 'bg-slate-50 text-indigo-700';

  constructor() {}

  ngOnInit() {}
}
