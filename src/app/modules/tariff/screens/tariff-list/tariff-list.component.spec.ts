import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SortConfig } from '../../../../shared/ui/v-list/v-list';
import { TariffCardComponent } from '../../components/tariff-card/tariff-card.component';
import { TariffDataService } from '../../services/tariff-data-service/tariff-data.service';
import { TariffListComponent } from './tariff-list.component';
import { VListModule } from '../../../../shared/ui/v-list/v-list.module';
import { mockTariffData } from '../../mocks/tariff-data-mock';
import { of } from 'rxjs';

describe('TariffListComponent', () => {
  let component: TariffListComponent;
  let fixture: ComponentFixture<TariffListComponent>;
  let mockTariffDataService: jasmine.SpyObj<TariffDataService>;

  beforeEach(async () => {
    // Create a spy for TariffDataService
    mockTariffDataService = jasmine.createSpyObj('TariffDataService', ['getTariffs']);
    mockTariffDataService.getTariffs.and.returnValue(of( {data: mockTariffData,
      numberOfTotalPage: 1,
      numberOfCurrentPage: 1
    }));

    await TestBed.configureTestingModule({
      declarations: [TariffListComponent],
      imports: [
        TariffCardComponent,
        VListModule,
        NoopAnimationsModule //NoopAnimationsModule to disable animations
      ],
      providers: [{ provide: TariffDataService, useValue: mockTariffDataService }]
    }).compileComponents();

    fixture = TestBed.createComponent(TariffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should set vListItemComponent to TariffCardComponent', () => {
    expect(component.vListItemComponent).toBe(TariffCardComponent);
  });

  it('should define a sortConfig array with sort options', () => {
    const expectedSortConfig: SortConfig[] = [
      { attribute: 'price', label: 'Price', direction: 'asc' },
      { attribute: 'price', label: 'Price', direction: 'desc' },
      { attribute: 'downloadSpeed', label: 'Download', direction: 'asc' },
      { attribute: 'downloadSpeed', label: 'Download', direction: 'desc' },
      { attribute: 'uploadSpeed', label: 'Upload', direction: 'asc' },
      { attribute: 'uploadSpeed', label: 'Upload', direction: 'desc' },
      { attribute: 'rating', label: 'Rating', direction: 'asc' },
      { attribute: 'rating', label: 'Rating', direction: 'desc' },
    ];
    
    expect(component.sortConfig).toEqual(expectedSortConfig);
  });
});
