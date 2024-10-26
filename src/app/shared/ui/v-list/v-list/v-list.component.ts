import { Component, Input, OnInit, Signal, signal } from '@angular/core';
import { ListDataSource, SortParams } from '../../../utils/list-data-source';

import { DropDownOption } from '../../v-dropdown/v-dropdown.component';
import { SortConfig } from '../v-list';

@Component({
  selector: 'app-v-list',
  templateUrl: './v-list.component.html',
  styleUrl: './v-list.component.scss',
})
export class VListComponent<T> implements OnInit {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) itemComponent!: unknown; // Required input for the custom component to render each item
  @Input({ required: true }) listDataSource!: ListDataSource<T>;
  @Input() itemSize: number = 300;

  private _sortConfig: SortConfig[] | undefined; // Private property

  get sortConfig(): SortConfig[] | undefined {
    return this._sortConfig;
  }

  @Input()
  set sortConfig(config: SortConfig[] | undefined) {
    if (config) {
      this._sortConfig = config;
      this.sortOptions = this.sortConfigToSortOption(config);
    }
  }

  data!: Signal<T[]>; // Holds the data fetched from the data source

  isLoading: Signal<boolean> = signal(false);
  sortOptions: DropDownOption[] = this.sortConfigToSortOption(
    this.sortConfig || [],
  );

  constructor() {}

  ngOnInit(): void {
    this.data = this.listDataSource.getData();
    this.isLoading = this.listDataSource.getLoadingState();
  }

  onScroll(event:any): void {
    console.log(event.target.scrollHeight, event.target.scrollTop);
    
  }

  onSortSelectionChange(value: string): void {
    const sortOption = JSON.parse(value) as SortConfig;
    const sortParams: SortParams<T> = {
      attribute: sortOption.attribute as keyof T,
      direction: sortOption.direction,
    };
    this.listDataSource.applySorting(sortParams);
  }

  sortConfigToSortOption(sortConfig: SortConfig[]): DropDownOption[] {
    const sortOptions: DropDownOption[] = [];
    sortConfig.forEach((config) => {
      sortOptions.push({
        label: config.label + ' (' + config.direction.toUpperCase() + ')',
        value: JSON.stringify({
          attribute: config.attribute,
          direction: config.direction,
        }),
      });
    });

    return sortOptions;
  }
}
