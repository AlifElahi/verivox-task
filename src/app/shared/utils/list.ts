/**
 * Interface for SortParams
 * Describes the structure of the sort params accepted by the ListDataSource
 */

export interface SortParams<T> {
    attribute: keyof T;
    direction: 'asc' | 'desc';
  }
  /**
   * Interface for ListFetchResponse
   */
  export interface ListFetchResponse<T>{
    data: T[]
    numberOfTotalPage: number,
    numberOfCurrentPage: number
  }