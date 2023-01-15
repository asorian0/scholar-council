import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { environment } from '../../../environments/environment';
import gitVersion from '../git-version.json';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  public readonly version = gitVersion.hash;
  public readonly href = `mailto:${environment.supportEmail}?subject=${environment.supportSubject}&body=Version:%20${this.version}`;
  public readonly repoUrl = environment.repoUrl;

  @ViewChild('template')
  public template!: TemplateRef<any>;

  constructor(private readonly sheet: MatBottomSheet) {
  }

  public open(): void {
    this.sheet.open(this.template);
  }
}
