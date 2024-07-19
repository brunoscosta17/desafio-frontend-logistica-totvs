import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaDeEntregasComponent } from './lista-de-entregas.component';

const routes: Routes = [
  { path: '', component: ListaDeEntregasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListDeliveriesRoutingModule { }
