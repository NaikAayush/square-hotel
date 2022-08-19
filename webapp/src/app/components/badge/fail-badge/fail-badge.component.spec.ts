import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailBadgeComponent } from './fail-badge.component';

describe('FailBadgeComponent', () => {
  let component: FailBadgeComponent;
  let fixture: ComponentFixture<FailBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailBadgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
