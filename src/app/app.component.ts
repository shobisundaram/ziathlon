import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  private routerSubscription: Subscription;

  constructor(
    private analytics: AnalyticsService,
    private router: Router,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  
    this.routerSubscription = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          const urlList = this.router.url.split('/');
          const lastUrlSegment = urlList[urlList.length - 1];
          console.log('Last URL Segment:', lastUrlSegment);
  
          const token = localStorage.getItem('auth_app_token');
  
          // Prevent navigating to /pages if already there
          if ((lastUrlSegment.startsWith('login') || lastUrlSegment.startsWith('auth')) && token) {
            if (!this.router.url.includes('/pages')) {
              this.router.navigate(['/pages']);
            }
            return '';
          }
  
          return lastUrlSegment;
        })
      )
      .subscribe((title) => {
        console.log('Route:', title);
      });
  }
  
  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
