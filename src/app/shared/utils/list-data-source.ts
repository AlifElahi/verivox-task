import { Signal, computed, signal } from '@angular/core';

import { ListFetchResponse } from '../../modules/tariff/models/tariff.model';
import { Observable, ReplaySubject } from 'rxjs';


export class ListDataSource<T> {
  /**
   * An observable that emits the current data for the list.
   */
  private dataSignal = signal<T[]>([]);
  /**
   * An observable that emits the loading state of the list data source.
   */
  private loadingSignal = signal<boolean>(false);
  /**
   * An observable that emits the total number of pages available for the data.
   */
  private totalPagesSignal = signal<number>(0);
  /**
   * An observable that emits the current page number.
   */
  private currentPageSignal = signal<number>(1);

  constructor(private dataService: (page: number) => Observable<ListFetchResponse<T>>) {
    this.loadData();
  }

/**
 * Loads data for the specified page and updates internal signals for data, current page,
 * and total pages. Emits a signal when loading starts and completes.
 *
 * @param page - The page number to load data for. Defaults to the current page.
 * @returns An observable that emits when the data loading is complete.(for easy of testing)
 */
   loadData(page: number = this.currentPageSignal()): Observable<void> {
    const replySubject = new ReplaySubject<void>;
    this.loadingSignal.set(true);
    this.dataService(page).subscribe({
      next: (res) => {
        this.dataSignal.set([...(this.dataSignal()||[]),...res.data]);
        this.currentPageSignal.set(res.numberOfCurrentPage);
        this.totalPagesSignal.set(res.numberOfTotalPage);
        this.loadingSignal.set(false);
        replySubject.next();
        replySubject.complete();
      },
      error: () => {
        this.loadingSignal.set(false);
        replySubject.next();
        replySubject.complete();
      },
    });

    return replySubject.asObservable();
  }

  
  /**
   * Gets the list of data.
   *
   * @returns - A signal that emits an array of data items.
   */
  getData(): Signal<T[]> {
    return computed(() => this.dataSignal());
  }

  /**
   * Gets the loading state of the list data source.
   *
   * @returns - A signal that emits `true` if the data is loading, `false` otherwise.
   */
  getLoadingState(): Signal<boolean> {
    return computed(() => this.loadingSignal());
  }

  /**
   * Gets the current page number of the data.
   *
   * @returns - A signal that emits the current page number.
   */

  getCurrentPage(): Signal<number> {
    return computed(() => this.currentPageSignal());
  }

  /**
   * Gets the total number of pages available for the data.
   *
   * @returns - A signal that emits the total number of pages.
   */
  getTotalPages(): Signal<number> {
    return computed(() => this.totalPagesSignal());
  }

  /**
   * Sorts the data with the given SortParams and updates the data signal.
   *
   * @param sortParams - The SortParams to use for sorting.
   */
  applySorting(sortParams: SortParams<T>): void {
    const sortedData = this.sort(sortParams, [...this.dataSignal()]);
    this.dataSignal.set(sortedData);
  }

/**
 * Sorts an array of data based on the specified SortParams.
 *
 * @param sortParams - An object containing the attribute to sort by and the direction of sorting ('asc' or 'desc').
 * @param data - The array of data to be sorted.
 * @returns A new array sorted according to the specified attribute and direction.
 */
   sort(sortParams: SortParams<T>, data: T[]): T[] {
    return data.sort((a, b) => {
      const valueA = a[sortParams.attribute];
      const valueB = b[sortParams.attribute];
      if (valueA == null || valueB == null) return 0;

      if (sortParams.direction === 'asc') {
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      } else {
        return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
      }
    });
  }

  /**
   * Increments the current page number and fetches the data for the new page number by calling loadData,
   * if the new page number is within the range of total pages.
   */
  nextPage(): void {
    if (this.currentPageSignal() < this.totalPagesSignal()) {
      this.loadData(this.currentPageSignal() + 1);
    }
  }



  /**
   * Resets the data source by clearing the current data and setting the page to the first page.
   * This will also reload data for the first page by calling loadData.
   */

  reset(): void {
    this.currentPageSignal.set(1);
    this.dataSignal.set([]);
    this.loadData(this.currentPageSignal());
  }
}

export interface SortParams<T> {
  attribute: keyof T;
  direction: 'asc' | 'desc';
}