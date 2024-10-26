import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { TariffFetchResponse } from '../../models/tariff.model';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TariffDataService {
  private readonly totalItems = 600; 
  private readonly itemsPerPage = 10;

  // Method to simulate an API call that fetches tariffs for a given page
  getTariffs(page: number): Observable<TariffFetchResponse> {
    const tariffs = Array.from({ length: this.itemsPerPage }, (_, index) => ({
      index: (page - 1) * this.itemsPerPage + index + 1,
      tariffName: `Tariff ${(page - 1) * this.itemsPerPage + index + 1}`,
      rating: Math.floor(Math.random() * 5) + 1,
      benefits: ['Unlimited Calls', 'Free SMS', 'International Roaming', 'Young People Access']
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 5) + 1),
      price: Math.floor(Math.random() * 80) + 20,
      downloadSpeed: Math.floor(Math.random() * 500) + 50,
      uploadSpeed: Math.floor(Math.random() * 100) + 10
    }));

    const response: TariffFetchResponse = {
      data: tariffs,
      numberOfTotalPage: Math.ceil(this.totalItems / this.itemsPerPage),
      numberOfCurrentPage: page
    };

    return of(response).pipe(delay(200)); // Simulated API latency
  }
}
