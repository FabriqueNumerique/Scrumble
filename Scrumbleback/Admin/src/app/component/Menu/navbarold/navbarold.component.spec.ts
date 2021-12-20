import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbaroldComponent } from './navbarold.component';

describe('NavbaroldComponent', () => {
  let component: NavbaroldComponent;
  let fixture: ComponentFixture<NavbaroldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbaroldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbaroldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
