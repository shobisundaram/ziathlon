import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalisationComponent } from '../localisation/localisation.component';

const routes: Routes = [
  {
    path: 'localisation',
    component: LocalisationComponent
  },
  { path: '', redirectTo: 'localisation', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
