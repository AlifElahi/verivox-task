import { Injectable } from '@angular/core';
import { ListDataSource } from '../../../../../shared/utils/list-data-source';
import { Tariff } from '../../../models/tariff.model';
import { TariffDataService } from '../../../services/tariff-data-service/tariff-data.service';

@Injectable({
  providedIn: 'root'
})

/**
 * Tariff data source class
 * It extends the ListDataSource class and provides an API to fetch tariffs
 * 
 * custom sort can also be set from here.
 * 
 * @Note as this file just extends the base class and does not have any other additional logic
 * it  is not covered by unit tests.
 */
export class TariffDataSource extends ListDataSource<Tariff> {
  constructor(private tariffService: TariffDataService) {
    super((page: number) => tariffService.getTariffs(page)); 
  }

}
