import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { TruncateContentPipe } from './truncate-content.pipe';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { InfoComponent } from './info/info.component';

const modules = [
  MatButtonModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatIconModule,
  ReactiveFormsModule,
  MatInputModule,
  MatTableModule,
  MatSortModule,
  MatCheckboxModule,
  MatCardModule,
  MatDividerModule,
  MatSnackBarModule,
  MatBottomSheetModule,
  TranslateModule,
];

const pipes = [TruncateContentPipe];

const components = [ScrollToTopComponent, InfoComponent];

@NgModule({
  imports: [CommonModule, ...modules],
  exports: [...modules, ...pipes, ...components],
  declarations: [...pipes, ...components],
})
export class SharedModule {}
