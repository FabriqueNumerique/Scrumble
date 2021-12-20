import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PbcarteCreateComponent } from './pbcarte-create.component';

describe('PbcarteCreateComponent', () => {
  let component: PbcarteCreateComponent;
  let fixture: ComponentFixture<PbcarteCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PbcarteCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PbcarteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
