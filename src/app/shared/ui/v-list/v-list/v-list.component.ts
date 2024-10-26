import { Component, Input, OnInit, Signal, signal } from '@angular/core';

import { DropDownOption } from '../../v-dropdown/v-dropdown.component';
import { ListDataSource } from '../../../utils/list-data-source';
import { SortConfig } from '../v-list';
import { SortParams } from '../../../utils/list';

@Component({
  selector: 'app-v-list',
  templateUrl: './v-list.component.html',
  styleUrl: './v-list.component.scss',
})
export class VListComponent<T> implements OnInit {
  /**
   * The title of the list
   */
  @Input({ required: true }) title!: string;
  /**
   * The custom component to render each item
   * Required input
   */
  @Input({ required: true }) itemComponent!: unknown; 
  /**
   * The list data source
   */
  @Input({ required: true }) listDataSource!: ListDataSource<T>;
  /**
   * The height of each item
   */
  @Input() itemSize: number = 200;
  /**
   * Whether to enable scroll pagination
   * initial value is false
   * if set true it will fetch data on scroll
   */
  @Input() isScrollPaginationEnabled: boolean = false;


  private _sortConfig: SortConfig[] | undefined; // Private property

  get sortConfig(): SortConfig[] | undefined {
    return this._sortConfig;
  }

  @Input()
  /**
   * An array of {@link SortConfig} objects to configure the sorting options in the dropdown.
   * Each object in the array should have a unique `attribute` value.
   * The `label` property is used to display the text of the option in the dropdown.
   * The `direction` property should be either 'asc' for ascending or 'desc' for descending.
   * The last object in the array will be the default selected option.
   * 
   * */
  set sortConfig(config: SortConfig[] | undefined) {
    if (config) {
      this._sortConfig = config;
      this.sortOptions = this.sortConfigToSortOption(config);
    }
  }
/**
 * The list data
 */
  data!: Signal<T[]>; 
  /**
   * The current page number
   */
  currentPageNumber!: Signal<number> 
  /**
   * The total number of pages
   */
  numberOfTotalPages!: Signal<number>
/**
 * Signal that emits `true` if the data is loading, `false` otherwise.
 */
  isLoading: Signal<boolean> = signal(false);
  /**
   * An array of options for the sorting dropdown.
   */
  sortOptions: DropDownOption[] = this.sortConfigToSortOption(
    this.sortConfig || [],
  );

  constructor() {}

  ngOnInit(): void {
    this.data = this.listDataSource.getData();
    this.currentPageNumber = this.listDataSource.getCurrentPage();
    this.numberOfTotalPages = this.listDataSource.getTotalPages();
    this.isLoading = this.listDataSource.getLoadingState();
  }

/**
 * Handles the scroll event on the list. 
 * This function checks if the user has scrolled to the bottom of the list 
 * and can be used to trigger actions like loading more data.
 * 
 * @param event - The scroll event triggered by the list container.
 */
  onScroll(event:any): void {
    if(!this.isScrollPaginationEnabled) return;
    const scrollTop = event.target.scrollTop;
    const scrollHeight = event.target.scrollHeight;
    const clientHeight = event.target.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight-10) {
      this.loadDataOnScroll();
    }
  }

  /**
   * Loads the next page of data when the user has scrolled to the bottom of the list.
   * This function is called from the onScroll event handler.
   * It will not trigger if the data is already loading or if we are already at the last page.
   */
  loadDataOnScroll(): void {
    if(this.isLoading()) return;
    if (this.currentPageNumber() < this.numberOfTotalPages()) {
      this.listDataSource.nextPage();
    }
  }

  /**
   * Handles the selection change event on the dropdown for sorting.
   * This function parses the selected value from the dropdown (which is a JSON string of the SortConfig object)
   * and uses it to create a SortParams object. It then calls the applySorting method of the listDataSource
   * to sort the list using the selected sort option.
   * @param value - The selected value from the dropdown as a JSON string.
   */
  onSortSelectionChange(value: string): void {
    const sortOption = JSON.parse(value) as SortConfig;
    const sortParams: SortParams<T> = {
      attribute: sortOption.attribute as keyof T,
      direction: sortOption.direction,
    };
    this.listDataSource.applySorting(sortParams);
  }

  /**
   * Takes an array of SortConfig objects and converts them to an array of DropDownOption objects.
   * Each SortConfig object is converted to a DropDownOption by using the label of the SortConfig
   * and appending the direction of the SortConfig in parentheses. The value of the DropDownOption
   * is set to a JSON string of an object containing the attribute and direction of the SortConfig.
   * @param sortConfig - An array of SortConfig objects.
   * @returns An array of DropDownOption objects.
   */
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
