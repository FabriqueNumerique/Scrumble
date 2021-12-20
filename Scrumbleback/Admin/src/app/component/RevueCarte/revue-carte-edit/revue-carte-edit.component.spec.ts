import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevueCarteEditComponent } from './revue-carte-edit.component';

describe('RevueCarteEditComponent', () => {
  let component: RevueCarteEditComponent;
  let fixture: ComponentFixture<RevueCarteEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevueCarteEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevueCarteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
