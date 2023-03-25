import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { gql } from '@apollo/client/core';
import { TranslateService } from '@ngx-translate/core';
import { WINDOW } from 'ngx-window-token';
import { environment } from '../environments/environment';
import { AwsAuthService } from './aws-auth/shared/aws-auth.service';
import { Report } from './schema';
import { AppSyncService } from './shared/app-sync.service';
import { TosNoticeService } from './shared/tos-notice.service';
import { TosNoticeComponent } from './shared/tos-notice/tos-notice.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public readonly title = environment.title;
  public readonly subtitle = environment.subtitle;
  public loggedIn = false;
  public username?: string;
  public data: Report[] = [];
  public homeView = true;

  private readonly listReportQuery = gql(`
query listReport {
  listPublishedReport {
    id
    title
    content
    date
  }
}
  `);

  private bottomSheetRef?: MatBottomSheetRef;

  constructor(
    private readonly auth: AwsAuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly api: AppSyncService,
    @Inject(WINDOW) private readonly window: Window,
    private readonly translate: TranslateService,
    private readonly bottom: MatBottomSheet,
    private readonly tosNotice: TosNoticeService,
  ) {
    this.window.document.title = this.title;

    this.translate.setDefaultLang(environment.defaultLanguage);
    this.translate.use(environment.defaultLanguage);
  }

  public ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart || event instanceof NavigationEnd) {
        this.homeView = event.url === '/';
      }
    });

    this.auth.user$.subscribe((user: any) => {
      this.loggedIn = user != null;
      this.username = user?.email ?? undefined;

      if (!this.loggedIn) {
        void this.router.navigateByUrl('/');
      }

      this.api.start();
    });

    this.api.start();

    this.api
      .query(this.listReportQuery, {})
      .subscribe(
        (response) => (this.data = response.data?.listPublishedReport?.reverse() ?? [])
      );

    this.tosNotice.tosOk$.subscribe(() => {
      this.window.localStorage.setItem('tos-ok', 'true');
      this.bottomSheetRef?.dismiss();
    });

    if (!this.window.localStorage.getItem('tos-ok')) {
      this.bottomSheetRef = this.bottom.open(TosNoticeComponent, { disableClose: true });
    }
  }

  public logout(): void {
    this.auth.signOut();
  }
}
