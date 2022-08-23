import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit {
  @Input() success: boolean;
  @Input() title: string;
  @Input() body: string;
  svg: string;
  class: string;

  constructor(public storeService: StoreService) {}

  ngOnInit() {
    if (this.success) {
      this.svg = 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
      this.class = 'h-6 w-6 text-green-400';
    } else {
      this.svg =
        'M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z';
      this.class = 'h-6 w-6 text-red-400';
    }
    setTimeout(() => {
      this.storeService.toast = false;
    }, 5000);
  }
}
