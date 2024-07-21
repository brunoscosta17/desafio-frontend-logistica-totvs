import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDeliveriesComponent } from './list-deliveries.component';

const routes: Routes = [
  { path: '', component: ListDeliveriesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListDeliveriesRoutingModule { }
