import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userstories3EditComponent } from './userstories3-edit.component';

describe('Userstories3EditComponent', () => {
  let component: Userstories3EditComponent;
  let fixture: ComponentFixture<Userstories3EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Userstories3EditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Userstories3EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
