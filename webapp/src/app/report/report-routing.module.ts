import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportEntityComponent } from './report-entity/report-entity.component';
import { ReportListComponent } from './report-list/report-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: ReportListComponent,
  },
  {
    path: 'new',
    component: ReportEntityComponent,
  },
  {
    path: ':id',
    component: ReportEntityComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
