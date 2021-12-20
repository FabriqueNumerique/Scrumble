import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PbcarteIndexComponent } from './pbcarte-index.component';

describe('PbcarteIndexComponent', () => {
  let component: PbcarteIndexComponent;
  let fixture: ComponentFixture<PbcarteIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PbcarteIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PbcarteIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
