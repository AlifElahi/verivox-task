import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VDropdownComponent } from './v-dropdown.component';

describe('VDropdownComponent', () => {
  let component: VDropdownComponent;
  let fixture: ComponentFixture<VDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
