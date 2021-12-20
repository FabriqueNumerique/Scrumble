import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglesIndexComponent } from './regles-index.component';

describe('ReglesIndexComponent', () => {
  let component: ReglesIndexComponent;
  let fixture: ComponentFixture<ReglesIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReglesIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
