import { TestBed } from '@angular/core/testing';

import { DeliveryFakeDataService } from './delivery-fake-data.service';

describe('DeliveryFakeDataService', () => {
  let service: DeliveryFakeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryFakeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
