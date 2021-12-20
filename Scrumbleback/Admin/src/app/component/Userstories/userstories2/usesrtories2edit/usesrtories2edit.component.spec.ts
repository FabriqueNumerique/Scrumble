import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Usesrtories2editComponent } from './usesrtories2edit.component';

describe('Usesrtories2editComponent', () => {
  let component: Usesrtories2editComponent;
  let fixture: ComponentFixture<Usesrtories2editComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Usesrtories2editComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Usesrtories2editComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
