import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
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


});
