import { Component } from '@angular/core';
import { MENU_ITEMS } from '../../../pages/pages-menu';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MenuService } from '../../../shared/menu.service';
import { RIGHT_MENU_ITEMS } from '../../../pages/right-menu';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>



      <nb-sidebar class="main-sidebar" tag="main-sidebar">
        <ul class="icon-menu">
          <li *ngFor="let item of menu" [ngClass]="{ 'active-menu': activeSection === item }" 
              (click)="onParentClick(item)">
              <ng-container *ngIf="item.link; else nonLinkParent">
                <a 
                  href="{{item.link}}" 
                  routerLinkActive="active" 
                  class="menu py-1 mr-1"
                  (click)="onParentClick(item)">
                  <nb-icon [icon]="item.icon" pack="eva"></nb-icon>
                  <span class="menu-title m-0">{{ item.title }}</span>
                </a>
              </ng-container>

              <ng-template #nonLinkParent>
                <div class="menu py-1 mr-1" (click)="onParentClick(item)">
                  <nb-icon [icon]="item.icon" pack="eva"></nb-icon>
                  <span class="menu-title m-0">{{ item.title }}</span>
                </div>
              </ng-template>
          </li>
        </ul>
      </nb-sidebar>

      <!-- Child Sidebar (right side) -->
      <nb-sidebar
        *ngIf="activeSection?.children"
        [ngClass]="{ 'collapsed-child-sidebar': childSidebarCollapsed }"
        class="child-sidebar"
        tag="child-sidebar"
        state="expanded"
        position="right"
      >
        <!-- Collapsed version -->
        <ng-container *ngIf="childSidebarCollapsed; else expandedSidebar">
          <ul class="icon-menu">
            <li (click)="toggleChildSidebar()">
              <i class="fa fa-indent" aria-hidden="true"></i>
            </li>
            <li *ngFor="let child of activeSection.children" [title]="child.title"
                [ngClass]="{ 'active-child': router.url.includes(child.link) }">
              <a href="{{ child.link }}" routerLinkActive="active">
                <i [class]="child.icon"></i>
              </a>  
            </li>
          </ul>
        </ng-container>

        <!-- Expanded version -->
        <ng-template #expandedSidebar>
          <div class="child-header">
            {{ activeSection.title }}
            <button class="bars" nbButton ghost size="tiny" (click)="toggleChildSidebar()">
              <i class="fa fa-indent" aria-hidden="true"></i>
            </button>
          </div>

          <ul class="child-menu">
            <li *ngFor="let child of activeSection.children" class="child-item">
              <!-- Check if this child has sub-children -->
              <ng-container *ngIf="child.children && child.children.length > 0; else singleChild">
                <div class="child-dropdown-header" (click)="toggleSubMenu(child)">
                <div>
                  <i [class]="child.icon"></i>
                  <span>{{ child.title }}</span>
                </div>
                  <div>
                  <i class="fa" [ngClass]="{
                      'fa-chevron-down': !child.expanded,
                      'fa-chevron-up': child.expanded
                    }" style="margin-right:0;"></i>
                  </div>
                </div>

                <ul class="sub-child-menu" *ngIf="child.expanded">
                  <li *ngFor="let subChild of child.children"
                      [ngClass]="{ 'active-child': router.url.includes(subChild.link) }">
                    <a href="{{ subChild.link }}" >
                      <i [class]="subChild.icon"></i>
                      <span>{{ subChild.title }}</span>
                    </a>
                  </li>
                </ul>
              </ng-container>

              <ng-template #singleChild>
                <a href="{{ child.link }}" class="child-link"
                  [ngClass]="{ 'active-child': router.url.includes(child.link) }">
                  <i [class]="child.icon"></i>
                  <span>{{ child.title }}</span>
                </a>
              </ng-template>
            </li>
          </ul>
        </ng-template>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>
      <nb-sidebar class="right-sidebar" tag="main-sidebar">
        <ul class="icon-menu">
          <li *ngFor="let item of rightMenu"  
              (click)="onRightsidebarClick(item)">
                <div class="menu py-1 mr-1">
                  <nb-icon [icon]="item.icon" pack="eva"></nb-icon>
                </div>
          </li>
        </ul>
      </nb-sidebar>
      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent {
  menu = MENU_ITEMS;
  rightMenu = RIGHT_MENU_ITEMS;
  activeSection: any = null;
  childSidebarCollapsed = false;
  activeChildLink: string = '';
  showToolsSidebar = true
  constructor(
    private menuService: MenuService,
    private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentUrl = this.router.url;
        this.setActiveFromRoute(currentUrl);
      });

    // Set on initial load
    this.setActiveFromRoute(this.router.url);
  }

  setActiveFromRoute(currentUrl: string) {
    for (const item of this.menu) {
      if (item.children) {
        for (const child of item.children) {
          if (currentUrl.includes(child.link)) {
            this.activeSection = item;
            this.activeChildLink = child.link;
            return;
          }
        }
      } else if (currentUrl.includes(item.link)) {
        this.activeSection = item;
        this.activeChildLink = '';
        return;
      }
    }
  }

  onParentClick(item: any) {
    if (item.children) {
      this.activeSection = item;
      this.childSidebarCollapsed = false;
    }
  }

  toggleChildSidebar() {
    this.childSidebarCollapsed = !this.childSidebarCollapsed;
  }
  toggleSubMenu(child: any): void {
    child.expanded = !child.expanded;
  }
  onRightsidebarClick(item: any) {
    console.log(item,"=========")
    this.menuService.setSection(item.data?.key);
  }
}
