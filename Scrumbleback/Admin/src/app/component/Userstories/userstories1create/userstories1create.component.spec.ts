import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userstories1createComponent } from './userstories1create.component';

describe('Userstories1createComponent', () => {
  let component: Userstories1createComponent;
  let fixture: ComponentFixture<Userstories1createComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Userstories1createComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Userstories1createComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
