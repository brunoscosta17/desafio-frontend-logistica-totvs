import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Delivery } from '../models/Delivery.interface';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private readonly dataUrl = 'assets/data/deliveries.json';

  constructor(private http: HttpClient) { }

  getDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.dataUrl) as Observable<Delivery[]>;
  }

}
