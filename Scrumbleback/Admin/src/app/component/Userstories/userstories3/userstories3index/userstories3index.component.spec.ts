import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userstories3indexComponent } from './userstories3index.component';

describe('Userstories3indexComponent', () => {
  let component: Userstories3indexComponent;
  let fixture: ComponentFixture<Userstories3indexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Userstories3indexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Userstories3indexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
