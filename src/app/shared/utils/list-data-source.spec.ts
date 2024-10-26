import { ListFetchResponse, SortParams } from './list';

import { ListDataSource } from './list-data-source';
import { of } from 'rxjs';

interface MockItem {
  id: number;
  name: string;
  price: number;
}

describe('ListDataSource', () => {
  let listDataSource: ListDataSource<MockItem>;
  let mockDataService: jasmine.Spy;

  // Define a mock response to simulate API data
  const mockResponse: ListFetchResponse<MockItem> = {
    data: [
      { id: 1, name: 'Item 1', price: 50 },
      { id: 2, name: 'Item 2', price: 30 },
      { id: 3, name: 'Item 3', price: 40 }
    ],
    numberOfTotalPage: 5,
    numberOfCurrentPage: 1
  };

  beforeEach(() => {
    // Mock dataService to return the response as an observable
    mockDataService = jasmine.createSpy().and.returnValue(of(mockResponse));

    // Initialize ListDataSource with the mock dataService
    listDataSource = new ListDataSource<MockItem>(mockDataService);
  });

  it('should initialize and load data on instantiation', () => {
    // Check that the dataService is called once on instantiation
    expect(mockDataService).toHaveBeenCalledOnceWith(1);

    // Verify that the data is correctly loaded into the data signal
    expect(listDataSource.getData()()).toEqual(mockResponse.data);

    // Verify that current page and total pages are set correctly
    expect(listDataSource.getCurrentPage()()).toBe(1);
    expect(listDataSource.getTotalPages()()).toBe(5);
  });

  it('should call the dataService with the current page number', (done:DoneFn) => {
    listDataSource.loadData().subscribe(() => {
        expect(mockDataService).toHaveBeenCalledWith(listDataSource.getCurrentPage()());
        done();
    })

  })

  it('should sort by price in ascending order', () => {
    const sortedData = listDataSource.sort({ attribute: 'price', direction: 'asc' }, [...mockResponse.data]);
    expect(sortedData).toEqual([
      { id: 2, name: 'Item 2', price: 30 },
      { id: 3, name: 'Item 3', price: 40 },
      { id: 1, name: 'Item 1', price: 50 }
    ]);
  });

  it('should load the next page when nextPage is called', () => {
    // Call nextPage and check if the dataService is called with the incremented page number
    let spy= spyOn(listDataSource, 'loadData');
    listDataSource.nextPage(); // Move to page 2
    expect(spy).toHaveBeenCalledWith(2);
  });


  it('should not go to the next page if already on the last page', () => {
    let spy = spyOn(listDataSource, 'loadData');
    // Set the signals directly to simulate being on the last page
    listDataSource['totalPagesSignal'].set(5);
    listDataSource['currentPageSignal'].set(5);
  
    // Call nextPage and verify that it does not call dataService with a page beyond the last
    listDataSource.nextPage();
    expect(spy).not.toHaveBeenCalled()
  });
  

  it('should apply sorting to the data', () => {
    // Define sorting parameters to sort data by price in ascending order
    const sortParams: SortParams<MockItem> = { attribute: 'price', direction: 'asc' };

    // Apply sorting and verify that data is sorted by price in ascending order
    listDataSource.applySorting(sortParams);
    const sortedData = listDataSource.getData()();
    expect(sortedData).toEqual([
      { id: 2, name: 'Item 2', price: 30 },
      { id: 3, name: 'Item 3', price: 40 },
      { id: 1, name: 'Item 1', price: 50 }
    ]);
  });

  it('should reset the data and load the first page', () => {
    // Spy on loadData to verify it is called during reset
    spyOn(listDataSource, 'loadData');

    // Call reset and check that it clears data, sets the page to 1, and calls loadData
    listDataSource.reset();
    expect(listDataSource.getCurrentPage()()).toBe(1);
    expect(listDataSource.getData()()).toEqual([]);
    expect(listDataSource.loadData).toHaveBeenCalledWith(1);
  });

  it('should call sort with the correct parameters', () => {
    // Define sorting parameters to sort data by price in descending order
    let spy =spyOn(listDataSource, 'sort');
    const sortParams: SortParams<MockItem> = { attribute: 'price', direction: 'desc' };

    // Apply sorting and verify that data is sorted by price in descending order
    listDataSource.applySorting(sortParams);
    expect(spy).toHaveBeenCalledWith(sortParams, mockResponse.data);
  });
 
});
