import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglesCreateComponent } from './regles-create.component';

describe('ReglesCreateComponent', () => {
  let component: ReglesCreateComponent;
  let fixture: ComponentFixture<ReglesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReglesCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
