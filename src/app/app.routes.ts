import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'lista-de-entregas', loadChildren: () => import('./features/list-deliveries/list-deliveries.module').then(m => m.ListDeliveriesModule) }
];
