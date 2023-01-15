import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../shared/shared.module';

import { SuggestionRoutingModule } from './suggestion-routing.module';
import { SuggestionEntityComponent } from './suggestion-entity/suggestion-entity.component';
import { SuggestionListComponent } from './suggestion-list/suggestion-list.component';

@NgModule({
  declarations: [SuggestionEntityComponent, SuggestionListComponent],
  imports: [
    CommonModule,
    SuggestionRoutingModule,
    SharedModule,
    TranslateModule.forChild({
      extend: true,
    }),
  ],
})
export class SuggestionModule {}
