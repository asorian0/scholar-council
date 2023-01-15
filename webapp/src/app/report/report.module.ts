import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SimplemdeModule } from 'ngx-simplemde';

import { SharedModule } from '../shared/shared.module';

import { ReportEntityComponent } from './report-entity/report-entity.component';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportRoutingModule } from './report-routing.module';

@NgModule({
  declarations: [ReportEntityComponent, ReportListComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReportRoutingModule,
    SimplemdeModule.forRoot({
      // Global options
      options: {
        autosave: { enabled: true, uniqueId: 'MyUniqueID' },
      },
    }),
    TranslateModule.forChild({
      extend: true,
    }),
  ],
})
export class ReportModule {}
