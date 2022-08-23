import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  roomsAddScreenVisible = false;
  roomsHandleSuccess: boolean;
  roomsHandleTitle = '';
  roomsHandleBody = '';
  roomsHandleLoading = false;

  toast = false;

  constructor() {}
}
