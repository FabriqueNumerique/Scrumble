import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userstories1A1Component } from './userstories1-a1.component';

describe('Userstories1A1Component', () => {
  let component: Userstories1A1Component;
  let fixture: ComponentFixture<Userstories1A1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Userstories1A1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Userstories1A1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
