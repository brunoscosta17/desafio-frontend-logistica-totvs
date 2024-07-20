import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Delivery } from '../models/Delivery.interface';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private apiUrl = 'api/entregas';

  // constructor(private http: HttpClient) { }

  // getDeliveries(): Observable<Delivery[]> {
  //   return this.http.get<Delivery[]>(this.apiUrl).pipe(
  //     catchError(this.handleError<Delivery[]>('getEntregas', []))
  //   );
  // }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(error);
  //     return of(result as T);
  //   };
  // }

}
