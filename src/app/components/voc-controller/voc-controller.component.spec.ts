import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocControllerComponent } from './voc-controller.component';

describe('VocControllerComponent', () => {
  let component: VocControllerComponent;
  let fixture: ComponentFixture<VocControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VocControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VocControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
