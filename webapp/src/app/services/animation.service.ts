import { trigger, style, animate, transition } from '@angular/animations';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  addRoom = false;
  constructor() {}
}

export const openCloseAnimation = trigger('openCloseAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('200ms ease-in-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('200ms ease-in-out', style({ opacity: 0 })),
  ]),
]);

export const closeAnimation = trigger('closeAnimation', [
  transition(':leave', [
    style({ opacity: 1 }),
    animate('200ms', style({ opacity: 0 })),
  ]),
]);

export const slide = trigger('slide', [
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
    animate('200ms ease-in-out', style({ transform: 'translateX(0px)' })),
  ]),
  transition(':leave', [
    style({ transform: 'translateX(0px)' }),
    animate('200ms ease-in-out', style({ transform: 'translateX(100%)' })),
  ]),
]);
