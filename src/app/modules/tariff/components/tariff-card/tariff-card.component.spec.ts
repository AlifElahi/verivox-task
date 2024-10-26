import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffCardComponent } from './tariff-card.component';
import { mockTariffData } from '../../mocks/tariff-data-mock';

describe('TariffCardComponent', () => {
  let component: TariffCardComponent;
  let fixture: ComponentFixture<TariffCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TariffCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TariffCardComponent);
    component = fixture.componentInstance;
    component.data= mockTariffData[0];
    component.index=0
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
