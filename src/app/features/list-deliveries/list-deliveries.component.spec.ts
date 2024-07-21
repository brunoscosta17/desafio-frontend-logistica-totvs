import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ListDeliveriesComponent } from './list-deliveries.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeliveryService } from '../../services/delivery.service';
import { of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Delivery } from '../../models/Delivery.interface';

describe('ListDeliveriesComponent', () => {
  let component: ListDeliveriesComponent;
  let fixture: ComponentFixture<ListDeliveriesComponent>;
  let deliveryService: DeliveryService;
  let getDeliveriesSpy: jasmine.Spy;

  const mockDeliveries: Delivery[] = [
    {
      id: '1',
      documento: 'DOC1',
      motorista: { nome: 'Motorista 1' },
      cliente_origem: { nome: 'Cliente Origem 1', endereco: 'Endereço 1', bairro: 'Bairro 1', cidade: 'Cidade 1' },
      cliente_destino: { nome: 'Cliente Destino 1', endereco: 'Endereço 2', bairro: 'Bairro 2', cidade: 'Cidade 2' },
      status_entrega: 'pendente'
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ListDeliveriesComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        DeliveryService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListDeliveriesComponent);
    component = fixture.componentInstance;
    deliveryService = TestBed.inject(DeliveryService);
    getDeliveriesSpy = spyOn(deliveryService, 'getDeliveries').and.returnValue(of(mockDeliveries));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get deliveries on init', () => {
    expect(getDeliveriesSpy.calls.any()).toBe(true, 'getDeliveries called');
    expect(component.dataSource.data).toEqual(mockDeliveries);
  });

  it('should apply filter', () => {
    const event = { target: { value: 'Motorista 1' } } as unknown as Event;
    component.applyFilter(event, 'motorista');
    expect(component.dataSource.filter).toBe(JSON.stringify({ motorista: 'motorista 1', status_entrega: '' }));
  });

  it('should create filter', () => {
    const filterFunction = component.createFilter();
    const result = filterFunction(mockDeliveries[0], JSON.stringify({ motorista: 'motorista 1', status_entrega: 'pendente' }));
    expect(result).toBe(true);
  });

  it('should get status class', () => {
    expect(component.getStatusClass('pendente')).toBe('status-pendente');
    expect(component.getStatusClass('insucesso')).toBe('status-insucesso');
    expect(component.getStatusClass('entregue')).toBe('status-concluido');
  });
});
