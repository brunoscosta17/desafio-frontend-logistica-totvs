import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { TableComponent } from '../../shared/components/table/table.component';
import { DeliveryProgressByNeighborhood } from '../../models/DeliveryProgressByNeighborhood.interface';
import { NumberDeliveries } from '../../models/NumberDeliveries.interface';
import { DeliveryProgressEachDriver } from '../../models/DeliveryProgressEachDriver.interface';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DeliveryService } from '../../services/delivery.service';
import { Delivery } from '../../models/Delivery.interface';

interface GroupedDeliveryProgressEachDriver {
  [key: string]: DeliveryProgressEachDriver;
}

interface GroupedNumberDeliveries {
  [key: string]: NumberDeliveries;
}

interface GroupedDeliveryProgressByNeighborhood {
  [key: string]: DeliveryProgressByNeighborhood;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatToolbarModule,
    TableComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  deliveries: Delivery[] = [];

  readonly panelOpenState = signal(false);

  displayedColumnsDeliveryProgressEachDriver: string[] = ['nome', 'pendentes', 'realizadas'];
  displayedColumnsNumberDeliveries: string[] = ['nome', 'total'];
  displayedColumnsDeliveryProgressByNeighborhood: string[] = ['bairro', 'total', 'realizadas'];

  dataSourceDeliveryProgressEachDriver: DeliveryProgressEachDriver[] = [];
  dataSourceNumberDeliveries: NumberDeliveries[] = [];
  dataSourceDeliveryProgressByNeighborhood: DeliveryProgressByNeighborhood[] = [];

  constructor(private deliveryService: DeliveryService) { }

  ngOnInit(): void {
    this.getDeliveriesList();
  }

  getDeliveriesList(): void {
    this.deliveryService
      .getDeliveries()
      .subscribe(deliveries => {
        this.deliveries = deliveries;
        this.dataSourceDeliveryProgressEachDriver = this.getDeliveryProgressEachDriver();
        console.log(this.dataSourceDeliveryProgressEachDriver)
        this.dataSourceNumberDeliveries = this.getNumberDeliveries();
        this.dataSourceDeliveryProgressByNeighborhood = this.getDeliveryProgressByNeighborhood();
    });
  }

  getDeliveryProgressEachDriver(): DeliveryProgressEachDriver[] {
    const grouped: GroupedDeliveryProgressEachDriver = this.deliveries.reduce((acc, delivery) => {
      const motoristaNome = delivery.motorista.nome;
      if (!acc[motoristaNome]) {
        acc[motoristaNome] = { nome: motoristaNome, pendentes: 0, realizadas: 0 };
      }
      if (delivery.status_entrega === 'PENDENTE') {
        acc[motoristaNome].pendentes++;
      } else if (delivery.status_entrega === 'ENTREGUE') {
        acc[motoristaNome].realizadas++;
      }
      return acc;
    }, {} as GroupedDeliveryProgressEachDriver);

    return Object.values(grouped);
  }

  getNumberDeliveries(): NumberDeliveries[] {
    const grouped: GroupedNumberDeliveries = this.deliveries.reduce((acc, delivery) => {
      const motoristaNome = delivery.motorista.nome;
      if (!acc[motoristaNome]) {
        acc[motoristaNome] = { nome: motoristaNome, total: 0 };
      }
      if (delivery.status_entrega === 'INSUCESSO') {
        acc[motoristaNome].total++;
      }
      return acc;
    }, {} as GroupedNumberDeliveries);

    return Object.values(grouped);
  }

  getDeliveryProgressByNeighborhood(): DeliveryProgressByNeighborhood[] {
    const grouped: GroupedDeliveryProgressByNeighborhood = this.deliveries.reduce((acc, delivery) => {
      const bairro = delivery.cliente_destino.bairro;
      if (!acc[bairro]) {
        acc[bairro] = { bairro, total: 0, realizadas: 0 };
      }
      acc[bairro].total++;
      if (delivery.status_entrega === 'ENTREGUE') {
        acc[bairro].realizadas++;
      }
      return acc;
    }, {} as Record<string, DeliveryProgressByNeighborhood>);

    return Object.values(grouped);
  }

}
