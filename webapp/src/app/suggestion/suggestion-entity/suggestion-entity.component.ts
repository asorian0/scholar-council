import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { gql } from '@apollo/client/core';
import { catchError, of } from 'rxjs';

import { AppSyncService } from '../../shared/app-sync.service';

@Component({
  selector: 'app-suggestion-entity',
  templateUrl: './suggestion-entity.component.html',
  styleUrls: ['./suggestion-entity.component.scss'],
})
export class SuggestionEntityComponent implements OnInit {
  public readonly submitSuccessMessage = 'Gracias por enviar tu sugerencia';
  public readonly submitFailMessage =
    'Algo ha fallado. Por favor vuelve a intentarlo más tarde';

  public form = new FormGroup({
    senderName: new FormControl('', []),
    email: new FormControl('', []),
    content: new FormControl('', [Validators.required]),
  });
  public id?: string;

  private readonly createQuery =
    gql(`mutation createSuggestion($input: CreateSuggestionInput!) {
  createSuggestion(input: $input) {
    id
  }
}`);
  private readonly updateQuery =
    gql(`mutation updateSuggestion($id: ID!, $input: UpdateSuggestionInput!) {
  updateSuggestion(id: $id, input: $input) {
    id
  }
}`);
  private readonly getQuery = gql(`query getSuggestion($id: ID!) {
  getSuggestion(id: $id) {
    id
    senderName
    content
    email
  }
}`);

  constructor(
    private readonly api: AppSyncService,
    private readonly route: ActivatedRoute,
    private readonly snackbar: MatSnackBar,
    private readonly router: Router,
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
            senderName: response.data.getSuggestion.senderName,
            email: response.data.getSuggestion.email,
            content: response.data.getSuggestion.content,
          });
        });
    }
  }

  public submit(): void {
    this.api
      .mutate(this.createQuery, {
        input: {
          ...this.form.value,
        },
      })
      .pipe(
        catchError(() => {
          this.snackbar.open(this.submitFailMessage);
          return of({});
        })
      )
      .subscribe(() => {
        this.snackbar.open(this.submitSuccessMessage, '', { duration: 5000 });
        void this.router.navigateByUrl('/');
      });
  }
}
