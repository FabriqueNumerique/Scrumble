import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userstories3createComponent } from './userstories3create.component';

describe('Userstories3createComponent', () => {
  let component: Userstories3createComponent;
  let fixture: ComponentFixture<Userstories3createComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Userstories3createComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Userstories3createComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
