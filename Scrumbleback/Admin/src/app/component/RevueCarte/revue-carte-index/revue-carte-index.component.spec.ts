import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevueCarteIndexComponent } from './revue-carte-index.component';

describe('RevueCarteIndexComponent', () => {
  let component: RevueCarteIndexComponent;
  let fixture: ComponentFixture<RevueCarteIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevueCarteIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevueCarteIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
