import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DeliveryService } from './delivery.service';
import { Delivery } from '../models/Delivery.interface';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

describe('DeliveryService', () => {
  let service: DeliveryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeliveryService]
    });

    service = TestBed.inject(DeliveryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch deliveries', () => {
    const mockDeliveries: Delivery[] = [
      { id: '1', documento: 'doc1', motorista: { nome: 'Driver1' }, cliente_origem: { nome: 'Origin1', endereco: 'Addr1', bairro: 'Bairro1', cidade: 'Cidade1' }, cliente_destino: { nome: 'Dest1', endereco: 'Addr2', bairro: 'Bairro2', cidade: 'Cidade2' }, status_entrega: 'PENDENTE' }
    ];

    service.getDeliveries().subscribe(deliveries => {
      expect(deliveries).toEqual(mockDeliveries);
    });

    const req = httpMock.expectOne('assets/data/deliveries.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockDeliveries);
  });

  it('should handle error when fetching deliveries', () => {
    service.getDeliveries().pipe(
      catchError(error => {
        expect(error).toBeTruthy();
        return of([]);
      })
    ).subscribe(
      deliveries => {
        expect(deliveries).toEqual([]);
      }
    );

    const req = httpMock.expectOne('assets/data/deliveries.json');
    req.flush('Error fetching data', { status: 500, statusText: 'Internal Server Error' });
  });
});
