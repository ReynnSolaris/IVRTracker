import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditivrComponent } from './editivr.component';

describe('EditivrComponent', () => {
  let component: EditivrComponent;
  let fixture: ComponentFixture<EditivrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditivrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditivrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
