import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PbcarteEditComponent } from './pbcarte-edit.component';

describe('PbcarteEditComponent', () => {
  let component: PbcarteEditComponent;
  let fixture: ComponentFixture<PbcarteEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PbcarteEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PbcarteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
