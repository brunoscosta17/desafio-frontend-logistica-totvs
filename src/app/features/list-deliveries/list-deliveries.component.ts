import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { Delivery } from '../../models/Delivery.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DeliveryService } from '../../services/delivery.service';
import { CommonModule } from '@angular/common';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-list-deliveries',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule
  ],
  templateUrl: './list-deliveries.component.html',
  styleUrls: ['./list-deliveries.component.scss']
})
export class ListDeliveriesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'nome', 'cliente_origem', 'cliente_destino', 'documento', 'status_entrega'];
  dataSource = new MatTableDataSource<Delivery>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private filterValues: any = {
    motorista: '',
    status_entrega: ''
  };

  constructor(private deliveryService: DeliveryService) { }

  ngOnInit(): void {
    this.getDeliveriesList();
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource.sort = this.sort;
  }

  getDeliveriesList(): void {
    this.deliveryService.getDeliveries().subscribe(deliveries => this.dataSource.data = deliveries);
  }

  applyFilter(event: Event, filterType: string): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValues[filterType] = filterValue.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  createFilter(): (data: Delivery, filter: string) => boolean {
    return (data: Delivery, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      return data.motorista.nome.toLowerCase().includes(searchTerms.motorista)
          && data.status_entrega.toLowerCase().includes(searchTerms.status_entrega);
    };
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pendente':
        return 'status-pendente';
      case 'insucesso':
        return 'status-insucesso';
      case 'entregue':
        return 'status-concluido';
      default:
        return '';
    }
  }

}
