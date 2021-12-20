import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevueCarteCreateComponent } from './revue-carte-create.component';

describe('RevueCarteCreateComponent', () => {
  let component: RevueCarteCreateComponent;
  let fixture: ComponentFixture<RevueCarteCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevueCarteCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevueCarteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
