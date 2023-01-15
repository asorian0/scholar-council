import { Component, OnInit } from '@angular/core';
import { gql } from '@apollo/client/core';

import { Report } from '../../schema';

import { AppSyncService } from '../../shared/app-sync.service';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.scss'],
})
export class SuggestionListComponent implements OnInit {
  public readonly displayedColumns: string[] = [
    'date',
    'content',
    'actions',
  ];

  public dataSource: Report[] = [];

  private readonly listQuery = gql(`
query listSuggestion {
  listSuggestion {
    id
    content
    createdAt
  }
}
  `);

  constructor(private readonly api: AppSyncService) {}

  public ngOnInit(): void {
    this.api.query(this.listQuery, {}).subscribe((response) => {
      this.dataSource = response.data.listSuggestion;
    });
  }
}
