import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TariffCardComponent } from '../../components/tariff-card/tariff-card.component';
import { TariffDataService } from '../../services/tariff-data-service/tariff-data.service';
import { TariffDataSource } from './tariff-data-source/tariff-data-source';
import { TariffListComponent } from './tariff-list.component';
import { of } from 'rxjs';

describe('TariffListComponent', () => {
  let component: TariffListComponent;
  let fixture: ComponentFixture<TariffListComponent>;
  let tariffDataService: jasmine.SpyObj<TariffDataService>;

  beforeEach(async () => {
    const tariffDataServiceSpy = jasmine.createSpyObj('TariffDataService', {
      getTariffs: of([])  // Mock getTariffs to return an empty observable
    });

    await TestBed.configureTestingModule({
      declarations: [TariffListComponent],
      providers: [{ provide: TariffDataService, useValue: tariffDataServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    tariffDataService = TestBed.inject(TariffDataService) as jasmine.SpyObj<TariffDataService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TariffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the dataSource as an instance of TariffDataSource', () => {
    expect(component.dataSource).toBeInstanceOf(TariffDataSource);
  });

  it('should set the item component to TariffCardComponent', () => {
    expect(component.vListItemComponent).toBe(TariffCardComponent);
  });

});
