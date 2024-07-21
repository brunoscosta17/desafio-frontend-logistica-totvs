import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Delivery } from '../../models/Delivery.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DeliveryService } from '../../services/delivery.service';

@Component({
  selector: 'app-list-deliveries',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './list-deliveries.component.html',
  styleUrl: './list-deliveries.component.scss'
})
export class ListDeliveriesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'nome', 'cliente_origem', 'cliente_destino', 'documento', 'status_entrega'];
  dataSource = new MatTableDataSource<Delivery>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private deliveryService: DeliveryService) { }

  ngOnInit(): void {
    this.getDeliveriesList();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getDeliveriesList(): void {
    this.deliveryService.getDeliveries().subscribe(deliveries => {console.log(deliveries); this.dataSource.data = deliveries});
  }

}
