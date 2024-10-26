import { Injectable } from '@angular/core';
import { ListDataSource } from '../../../../../shared/utils/list-data-source';
import { Tariff } from '../../../models/tariff.model';
import { TariffDataService } from '../../../services/tariff-data-service/tariff-data.service';

@Injectable({
  providedIn: 'root'
})
export class TariffDataSource extends ListDataSource<Tariff> {
  constructor(private tariffService: TariffDataService) {
    super((page: number) => tariffService.getTariffs(page)); // Use the service's paginated data fetching method
  }


}
