import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { MatSelectModule } from '@angular/material/select';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatGridListModule,
  MatSelectModule
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule { }
