import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbMenuModule, NbRadioModule, NbSelectModule, NbSidebarModule, NbTooltipModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';

import { TableModule } from "primeng/table";
import { DialogModule } from "primeng/dialog";
import { PaginatorModule } from "primeng/paginator";
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from "primeng/skeleton";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbSecurityModule } from '@nebular/security';
import { NotFoundComponent } from './not-found/not-found.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullcalenderComponent } from './fullcalender/fullcalender.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MenuService } from '../shared/menu.service';

@NgModule({
  imports: [
    FullCalendarModule,
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    TableModule,
    DialogModule,
    NbDialogModule.forChild(),
    PaginatorModule,
    ButtonModule,
    SkeletonModule,
    NbCardModule,
    NbButtonModule,
    NbTooltipModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    FormsModule,
    NbInputModule,
    NbSelectModule,
    NbTooltipModule,
    NbIconModule,
    NbSecurityModule.forRoot(),
    NbSidebarModule,
    NbRadioModule,
  ],
  declarations: [
    PagesComponent,
    DynamicTableComponent,
    NotFoundComponent,
    DeleteDialogComponent,
    DashboardComponent,
    FullcalenderComponent,
  ],
  exports: [ DeleteDialogComponent,DynamicTableComponent ],
  providers: [MenuService]
})
export class PagesModule {
}
