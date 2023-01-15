import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { gql } from '@apollo/client/core';

import { AppSyncService } from '../../shared/app-sync.service';

@Component({
  selector: 'app-report-entity',
  templateUrl: './report-entity.component.html',
  styleUrls: ['./report-entity.component.scss'],
})
export class ReportEntityComponent implements OnInit {
  public form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    published: new FormControl(false),
  });
  public id?: string;

  public readonly createSuccessMessage = '¡Informe creado!';
  public readonly updateSuccessMessage = '¡Informe actualizado!';

  private readonly createQuery =
    gql(`mutation createReport($input: CreateReportInput!) {
  createReport(input: $input) {
    id
  }
}`);
  private readonly updateQuery =
    gql(`mutation updateReport($id: ID!, $input: UpdateReportInput!) {
  updateReport(id: $id, input: $input) {
    id
  }
}`);
  private readonly getQuery = gql(`query getReport($id: ID!) {
  getReport(id: $id) {
    id
    title
    content
    date
  }
}`);

  constructor(
    private readonly api: AppSyncService,
    private readonly route: ActivatedRoute,
    private readonly snackbar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      this.api
        .query(this.getQuery, {
          id: this.id,
        })
        .subscribe((response) => {
          this.form.setValue({
            title: response.data.getReport.title,
            content: response.data.getReport.content,
            date: response.data.getReport.date,
            published: !!response.data.getReport.published,
          });
        });
    }
  }

  public submit(): void {
    if (this.id == null) {
      this.api
        .mutate(this.createQuery, {
          input: {
            ...this.form.value,
          },
        })
        .subscribe(() => {
          this.snackbar.open(this.createSuccessMessage);
        });
    } else {
      this.api
        .mutate(this.updateQuery, {
          id: this.id,
          input: {
            ...this.form.value,
          },
        })
        .subscribe(() => {
          this.snackbar.open(this.updateSuccessMessage);
        });
    }
  }
}
