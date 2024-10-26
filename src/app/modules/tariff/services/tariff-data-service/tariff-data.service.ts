import { Observable, delay, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { Tariff } from '../../models/tariff.model';
import { mockTariffData } from '../../mocks/tariff-data-mock';

@Injectable({
  providedIn: 'root',
})
export class TariffDataService {
  constructor() {}
  // Method to simulate an API call that returns mock data
  getTariffData(): Observable<Tariff[]> {
    return of(mockTariffData).pipe(delay(3000)); // Simulate the API call by returning mock data as an Observable
  }
}
