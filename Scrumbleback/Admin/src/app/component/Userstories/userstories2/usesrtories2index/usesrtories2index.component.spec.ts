import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Usesrtories2indexComponent } from './usesrtories2index.component';

describe('Usesrtories2indexComponent', () => {
  let component: Usesrtories2indexComponent;
  let fixture: ComponentFixture<Usesrtories2indexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Usesrtories2indexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Usesrtories2indexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
