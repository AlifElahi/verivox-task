import { Signal, computed, signal } from '@angular/core';

import { Observable } from 'rxjs';

export interface SortParams<T> {
  attribute: keyof T;
  direction: 'asc' | 'desc';
}
/**
 * Class to manage the data source for the list
 * This class should be used as a base class for all list components data source.
 * 
 * @template T - The type of the data
 * 
 * 
 * Example of it's use can be found in the TariffListComponent and TariffDataSource.
 */
export class ListDataSource<T> {
  /**
   * Signals to store the data
   */
  private dataSignal = signal<T[]>([]); 
  /**
   * Signal to track loading state
   */
  private loadingSignal = signal<boolean>(false); 

  private numberOfPagesFetched = 0; // Counter to track the number of times the data is loaded

  constructor(private dataService: Observable<T[]>) {
    this.loadData(); // Load data when the data source is initialized
  }

  /**
   * Load data from the service and update the loading state
   */
  private loadData(): void {
    this.numberOfPagesFetched++;
    this.loadingSignal.set(true); // Set loading to true
    this.dataService.subscribe({
      next: (data) => {
        this.dataSignal.set([...(this.dataSignal() || []), ...data]); // up the signal with the fetched data
        this.loadingSignal.set(false); // Set loading to false after data is loaded
      },
      error: () => {
        this.loadingSignal.set(false); // Set loading to false in case of an error
      },
    });
  }

  /**
   * Method to get the data signal, used by components to subscribe
   * @returns Signal<T[]> - The signal containing the data
   */
  getData(): Signal<T[]> {
    return computed(() => this.dataSignal());
  }

  // Method to get the loading state signal
  getLoadingState(): Signal<boolean> {
    return computed(() => this.loadingSignal());
  }

/**
 * Method to apply sorting to the data and update the data signal
 * @param sortParams - The sort parameters to preform the sorting
 */
  applySorting(sortParams: SortParams<T>): void {
    const sortedData = this.sort(sortParams, this.dataSignal());
    this.dataSignal.set([...sortedData]);
  }
  /**
   * Method to sort the data
   * @param sortParams  sort parameters like property name and direction
   * @param data data from signal on which the sorting is to be performed
   * @returns data after sorting
   */
  sort(sortParams: SortParams<T>, data: T[]): T[] {
    data.sort((a, b) => {
      const valueA = a[sortParams.attribute];
      const valueB = b[sortParams.attribute];

      if (sortParams.direction === 'asc') {
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      } else {
        return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
      }
    });
    
    return data;
  }

 /**
  * Method to reset the data source
  */
  reset(): void {
    this.numberOfPagesFetched = 0;
    this.dataSignal.set([]);
    this.loadData(); // Reload the data from the service
  }
}
