import { Injectable } from '@angular/core';
import { ListDataSource } from '../../../../../shared/utils/list-data-source';
import { Tariff } from '../../../models/tariff.model';
import { TariffDataService } from '../../../services/tariff-data-service/tariff-data.service';

@Injectable({
  providedIn: 'root',
})

/**
 * Data source for the Tariff list. This class should
 * encapsulate all logical interaction between list and data service.
 * It extends the ListDataSource class that provides basic implementation of the data source.
 * any additional logic can be added here or can be override in derived classes
 */
export class TariffDataSource extends ListDataSource<Tariff> {
  constructor(dataService: TariffDataService) {
    super(dataService.getTariffData()); // Pass the fake API call to the generic data source
  }
}
