import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VHeaderComponent } from './v-header.component';

describe('VHeaderComponent', () => {
  let component: VHeaderComponent;
  let fixture: ComponentFixture<VHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
