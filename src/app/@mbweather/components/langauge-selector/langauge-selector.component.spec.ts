import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LangaugeSelectorComponent } from './langauge-selector.component';

describe('LangaugeSelectorComponent', () => {
  let component: LangaugeSelectorComponent;
  let fixture: ComponentFixture<LangaugeSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LangaugeSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LangaugeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
