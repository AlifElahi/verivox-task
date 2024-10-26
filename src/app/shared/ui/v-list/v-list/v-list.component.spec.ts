import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VListComponent } from './v-list.component';

describe('VListComponent', () => {
  let component: VListComponent<any>;
  let fixture: ComponentFixture<VListComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
