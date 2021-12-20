import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglesEditComponent } from './regles-edit.component';

describe('ReglesEditComponent', () => {
  let component: ReglesEditComponent;
  let fixture: ComponentFixture<ReglesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReglesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
