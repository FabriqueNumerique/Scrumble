import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Usesrtories2createComponent } from './usesrtories2create.component';

describe('Usesrtories2createComponent', () => {
  let component: Usesrtories2createComponent;
  let fixture: ComponentFixture<Usesrtories2createComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Usesrtories2createComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Usesrtories2createComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
