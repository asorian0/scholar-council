import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './aws-auth/shared/admin.guard';
import { LogViewComponent } from './log-view/log-view.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./aws-auth/aws-auth.module').then((m) => m.AwsAuthModule),
  },
  {
    path: 'report',
    loadChildren: () =>
      import('./report/report.module').then((m) => m.ReportModule),
    canActivate: [AdminGuard],
  },
  {
    path: 'suggestion',
    loadChildren: () =>
      import('./suggestion/suggestion.module').then((m) => m.SuggestionModule),
  },
  {
    path: 'log/:id',
    component: LogViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
