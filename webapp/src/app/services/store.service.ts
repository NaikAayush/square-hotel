import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  roomsAddScreenVisible = false;
  toast = false;

  constructor() {}
}
