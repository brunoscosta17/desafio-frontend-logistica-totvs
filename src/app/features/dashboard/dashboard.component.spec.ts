import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DeliveryService } from '../../services/delivery.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TableComponent } from '../../shared/components/table/table.component';
import { Delivery } from '../../models/Delivery.interface';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let deliveryService: jasmine.SpyObj<DeliveryService>;

  beforeEach(async () => {
    const deliveryServiceSpy = jasmine.createSpyObj('DeliveryService', ['getDeliveries']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        MatToolbarModule,
        TableComponent,
        DashboardComponent
      ],
      providers: [{ provide: DeliveryService, useValue: deliveryServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    deliveryService = TestBed.inject(DeliveryService) as jasmine.SpyObj<DeliveryService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch deliveries on init', () => {
    const mockDeliveries: Delivery[] = [
      { id: '1', documento: 'doc1', motorista: { nome: 'Driver1' }, cliente_origem: { nome: 'Origin1', endereco: 'Addr1', bairro: 'Bairro1', cidade: 'Cidade1' }, cliente_destino: { nome: 'Dest1', endereco: 'Addr2', bairro: 'Bairro2', cidade: 'Cidade2' }, status_entrega: 'PENDENTE' }
    ];

    deliveryService.getDeliveries.and.returnValue(of(mockDeliveries));

    component.ngOnInit();

    expect(deliveryService.getDeliveries).toHaveBeenCalled();
    expect(component.deliveries).toEqual(mockDeliveries);
  });

  it('should correctly calculate delivery progress for each driver', () => {
    const mockDeliveries: Delivery[] = [
      { id: '1', documento: 'doc1', motorista: { nome: 'Driver1' }, cliente_origem: { nome: 'Origin1', endereco: 'Addr1', bairro: 'Bairro1', cidade: 'Cidade1' }, cliente_destino: { nome: 'Dest1', endereco: 'Addr2', bairro: 'Bairro2', cidade: 'Cidade2' }, status_entrega: 'PENDENTE' },
      { id: '2', documento: 'doc2', motorista: { nome: 'Driver1' }, cliente_origem: { nome: 'Origin2', endereco: 'Addr3', bairro: 'Bairro1', cidade: 'Cidade1' }, cliente_destino: { nome: 'Dest2', endereco: 'Addr4', bairro: 'Bairro2', cidade: 'Cidade2' }, status_entrega: 'ENTREGUE' }
    ];

    component.deliveries = mockDeliveries;
    const progress = component.getDeliveryProgressEachDriver();

    expect(progress).toEqual([{ nome: 'Driver1', pendentes: 1, realizadas: 1 }]);
  });

  it('should correctly calculate number of unsuccessful deliveries', () => {
    const mockDeliveries: Delivery[] = [
      { id: '1', documento: 'doc1', motorista: { nome: 'Driver1' }, cliente_origem: { nome: 'Origin1', endereco: 'Addr1', bairro: 'Bairro1', cidade: 'Cidade1' }, cliente_destino: { nome: 'Dest1', endereco: 'Addr2', bairro: 'Bairro2', cidade: 'Cidade2' }, status_entrega: 'INSUCESSO' },
      { id: '2', documento: 'doc2', motorista: { nome: 'Driver2' }, cliente_origem: { nome: 'Origin2', endereco: 'Addr3', bairro: 'Bairro1', cidade: 'Cidade1' }, cliente_destino: { nome: 'Dest2', endereco: 'Addr4', bairro: 'Bairro2', cidade: 'Cidade2' }, status_entrega: 'INSUCESSO' }
    ];

    component.deliveries = mockDeliveries;
    const progress = component.getNumberDeliveries();

    expect(progress).toEqual([
      { nome: 'Driver1', total: 1 },
      { nome: 'Driver2', total: 1 }
    ]);
  });

  it('should correctly calculate delivery progress by neighborhood', () => {
    const mockDeliveries: Delivery[] = [
      { id: '1', documento: 'doc1', motorista: { nome: 'Driver1' }, cliente_origem: { nome: 'Origin1', endereco: 'Addr1', bairro: 'Bairro1', cidade: 'Cidade1' }, cliente_destino: { nome: 'Dest1', endereco: 'Addr2', bairro: 'Bairro1', cidade: 'Cidade2' }, status_entrega: 'ENTREGUE' },
      { id: '2', documento: 'doc2', motorista: { nome: 'Driver2' }, cliente_origem: { nome: 'Origin2', endereco: 'Addr3', bairro: 'Bairro2', cidade: 'Cidade1' }, cliente_destino: { nome: 'Dest2', endereco: 'Addr4', bairro: 'Bairro2', cidade: 'Cidade2' }, status_entrega: 'PENDENTE' }
    ];

    component.deliveries = mockDeliveries;
    const progress = component.getDeliveryProgressByNeighborhood();

    expect(progress).toEqual([
      { bairro: 'Bairro1', total: 1, realizadas: 1 },
      { bairro: 'Bairro2', total: 1, realizadas: 0 }
    ]);
  });
});
