import { TariffDataService } from './tariff-data.service';
import { TestBed } from '@angular/core/testing';

describe('TariffDataServiceService', () => {
  let service: TariffDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TariffDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
