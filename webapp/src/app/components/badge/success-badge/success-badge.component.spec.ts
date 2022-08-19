import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessBadgeComponent } from './success-badge.component';

describe('SuccessBadgeComponent', () => {
  let component: SuccessBadgeComponent;
  let fixture: ComponentFixture<SuccessBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessBadgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
