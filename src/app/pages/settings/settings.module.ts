import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { LocalisationComponent } from '../localisation/localisation.component';
import { PagesModule } from '../pages.module';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
  declarations: [
    LocalisationComponent
  ],
  imports: [
    CommonModule,
    PagesModule,
    NbIconModule,
    NbInputModule,
    GoogleMapsModule,
    NbSelectModule,
    NbCardModule,
    ReactiveFormsModule,
    FormsModule,
    NbButtonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
