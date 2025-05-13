import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { MenuService } from '../shared/menu.service';
import { NbDialogService } from '@nebular/theme';
import { FullcalenderComponent } from './fullcalender/fullcalender.component';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <router-outlet class="p-10"></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
  showCalendar: boolean = false;
  constructor(
    private dialogService: NbDialogService,
    private menuService: MenuService
  ){}
ngOnInit() {
  this.menuService.section$.subscribe(section => {
    this.showCalendar = section === 'calendar';
    if(this.showCalendar){
      this.dialogService.open(FullcalenderComponent, {
      closeOnBackdropClick: true,
      hasBackdrop: true,
    });
    }
  });
}
}
