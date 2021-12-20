import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userstories1Component } from './userstories1.component';

describe('Userstories1Component', () => {
  let component: Userstories1Component;
  let fixture: ComponentFixture<Userstories1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Userstories1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Userstories1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
