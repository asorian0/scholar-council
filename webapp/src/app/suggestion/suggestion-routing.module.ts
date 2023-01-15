import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuggestionEntityComponent } from './suggestion-entity/suggestion-entity.component';
import { SuggestionListComponent } from './suggestion-list/suggestion-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: SuggestionListComponent,
  },
  {
    path: 'new',
    component: SuggestionEntityComponent,
  },
  {
    path: ':id',
    component: SuggestionEntityComponent,
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
export class SuggestionRoutingModule {}
