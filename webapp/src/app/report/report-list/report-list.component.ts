import { Component, OnInit } from '@angular/core';
import { gql } from '@apollo/client/core';
import { Report } from '../../schema';
import { AppSyncService } from '../../shared/app-sync.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
})
export class ReportListComponent implements OnInit {
  public readonly displayedColumns: string[] = ['date', 'title', 'actions'];

  public dataSource: Report[] = [];

  private readonly listQuery = gql(`
query listReport {
  listReport {
    id
    title
    date
  }
}
  `);

  constructor(private readonly api: AppSyncService) {}

  public ngOnInit(): void {
    this.api.query(this.listQuery, {}).subscribe((response) => {
      this.dataSource = response.data.listReport;
    });
  }
}
