import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { gql } from '@apollo/client/core';
import { Report } from '../schema';

import { AppSyncService } from '../shared/app-sync.service';

@Component({
  selector: 'app-log-view',
  templateUrl: './log-view.component.html',
  styleUrls: ['./log-view.component.scss'],
})
export class LogViewComponent implements OnInit {
  public id!: string;
  public data?: Report;

  private readonly getReportQuery = gql(`
query getReport($id: ID!) {
  getReport(id: $id) {
    id
    title
    content
    date
    createdAt
    updatedAt
  }
}
  `);

  constructor(
    private readonly api: AppSyncService,
    private readonly route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.api
      .query(this.getReportQuery, { id: this.id })
      .subscribe((response) => (this.data = response.data.getReport));
  }
}
