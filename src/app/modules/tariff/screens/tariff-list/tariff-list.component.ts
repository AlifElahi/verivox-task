import { Component } from '@angular/core';
import { SortConfig } from '../../../../shared/ui/v-list/v-list';
import { TariffCardComponent } from '../../components/tariff-card/tariff-card.component';
import { TariffDataService } from '../../services/tariff-data-service/tariff-data.service';
import { TariffDataSource } from './tariff-data-source/tariff-data-source';

@Component({
  selector: 'app-tariff-list',
  templateUrl: './tariff-list.component.html',
  styleUrl: './tariff-list.component.scss',
})
export class TariffListComponent {
  constructor(private tariffDataService: TariffDataService) {}
  /**
   * Tariff list data source, to be used by the v-list component
   */
  dataSource = new TariffDataSource(this.tariffDataService);
  /**
   * Tariff list item component, to be used by the v-list component for rendering each list item
   */
  vListItemComponent = TariffCardComponent;

  /**
   * Tariff list sort config, Defines the sort options for the list
   */
  sortConfig: SortConfig[] = [
    { attribute: 'price', label: 'Price', direction: 'asc' },
    { attribute: 'price', label: 'Price', direction: 'desc' },
    { attribute: 'downloadSpeed', label: 'Download', direction: 'asc' },
    { attribute: 'downloadSpeed', label: 'Download', direction: 'desc' },
    { attribute: 'uploadSpeed', label: 'Upload', direction: 'asc' },
    { attribute: 'uploadSpeed', label: 'Upload', direction: 'desc' },
    { attribute: 'rating', label: 'Rating', direction: 'asc' },
    { attribute: 'rating', label: 'Rating', direction: 'desc' },
  ];
}
