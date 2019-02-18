import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatCardModule, MatDialogModule, 
        MatChipsModule, MatInputModule, MatSelectModule, MatStepperModule,
        MatOptionModule, MatAutocompleteModule, MatIconModule, 
        MatDatepickerModule, MatNativeDateModule, MatPaginatorModule, MatSnackBarModule, MatTooltipModule, MatProgressSpinnerModule, MatSlideToggleModule, MatSidenavModule
} from '@angular/material';

const angularMaterialModules = [
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatChipsModule,
  MatInputModule, 
  MatSelectModule, 
  MatOptionModule,
  MatAutocompleteModule,
  MatIconModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatDialogModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatStepperModule,
  MatSlideToggleModule,
  MatSidenavModule
]

@NgModule({
  imports: [
    CommonModule,
    angularMaterialModules
  ],
  declarations: [],
  exports:[angularMaterialModules]
})
export class AngularMaterialModule { }
