import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userstories1editComponent } from './userstories1edit.component';

describe('Userstories1editComponent', () => {
  let component: Userstories1editComponent;
  let fixture: ComponentFixture<Userstories1editComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Userstories1editComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Userstories1editComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
