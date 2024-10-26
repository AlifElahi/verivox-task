import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropDownOption, VDropdownComponent } from '../../v-dropdown/v-dropdown.component';

import { CommonModule } from '@angular/common';
import { ListDataSource } from '../../../utils/list-data-source';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SortConfig } from '../v-list';
import { SortParams } from '../../../utils/list';
import { VListComponent } from './v-list.component';
import { signal } from '@angular/core';

describe('VListComponent', () => {
  let component: VListComponent<any>;
  let fixture: ComponentFixture<VListComponent<any>>;
  let mockListDataSource: jasmine.SpyObj<ListDataSource<any>>;

  beforeEach(async () => {
    mockListDataSource = jasmine.createSpyObj('ListDataSource', ['getData', 'getCurrentPage', 'getTotalPages', 'getLoadingState', 'nextPage', 'applySorting']);
    mockListDataSource.getData.and.returnValue(signal([]));
    mockListDataSource.getCurrentPage.and.returnValue(signal(1));
    mockListDataSource.getTotalPages.and.returnValue(signal(1));
    mockListDataSource.getLoadingState.and.returnValue(signal(false));
    mockListDataSource.applySorting.and.callFake(() => {});
    mockListDataSource.nextPage.and.returnValue();


    await TestBed.configureTestingModule({
      declarations: [VListComponent],
      imports: [
        CommonModule,
        ScrollingModule,
        VDropdownComponent,
        MatProgressBarModule,
      ],
      providers: [{ provide: ListDataSource, useValue: mockListDataSource }]
    }).compileComponents();

    fixture = TestBed.createComponent(VListComponent);
    component = fixture.componentInstance;
    component.listDataSource = mockListDataSource;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data, page, and loading signals from listDataSource on ngOnInit', () => {
    mockListDataSource.getData.and.returnValue(signal([{ id: 1 }]));
    mockListDataSource.getCurrentPage.and.returnValue(signal(1));
    mockListDataSource.getTotalPages.and.returnValue(signal(5));
    mockListDataSource.getLoadingState.and.returnValue(signal(false));

    component.ngOnInit();

    expect(component.data()).toEqual([{ id: 1 }]);
    expect(component.currentPageNumber()).toBe(1);
    expect(component.numberOfTotalPages()).toBe(5);
    expect(component.isLoading()).toBeFalse();
  });

    it('should load more data on scroll when pagination is enabled', () => {
      let spy= spyOn(component,'loadDataOnScroll');
      component.isScrollPaginationEnabled = true;
      component.currentPageNumber = signal(1);
      component.numberOfTotalPages = signal(5);
      component.isLoading = signal(false);

      const event = { target: { scrollTop: 100, scrollHeight: 500, clientHeight: 400 } };
      component.onScroll(event);

      expect(spy).toHaveBeenCalled();
    });


    it('should not load more data if pagination is disabled', () => {
      component.isScrollPaginationEnabled = false;
      let spy= spyOn(component,'loadDataOnScroll');


      const event = { target: { scrollTop: 100, scrollHeight: 500, clientHeight: 400 } };
      component.onScroll(event);

      expect(spy).not.toHaveBeenCalled();
    });

    it('should not load more data if already loading', () => {
      component.isScrollPaginationEnabled = true;
      component.isLoading = signal(true);

      const event = { target: { scrollTop: 100, scrollHeight: 500, clientHeight: 400 } };
      component.onScroll(event);

      expect(mockListDataSource.nextPage).not.toHaveBeenCalled();
    });

  it('should apply sorting with the selected sort option onSortSelectionChange', () => {

    const sortOption: SortConfig = { attribute: 'name', label: 'Name', direction: 'asc' };
    const sortParams: SortParams<any> = { attribute: 'name', direction: 'asc' };

    component.onSortSelectionChange(JSON.stringify(sortOption));

    expect(mockListDataSource.applySorting).toHaveBeenCalledWith(sortParams);
  });

  it('should convert SortConfig array to DropDownOption array with sortConfigToSortOption', () => {
    const sortConfig: SortConfig[] = [
      { attribute: 'name', label: 'Name', direction: 'asc' },
      { attribute: 'age', label: 'Age', direction: 'desc' }
    ];
    const expectedOptions: DropDownOption[] = [
      { label: 'Name (ASC)', value: JSON.stringify({ attribute: 'name', direction: 'asc' }) },
      { label: 'Age (DESC)', value: JSON.stringify({ attribute: 'age', direction: 'desc' }) }
    ];

    const result = component.sortConfigToSortOption(sortConfig);

    expect(result).toEqual(expectedOptions);
  });
});
