import {NgModule} from '@angular/core';
import {CdkTableModule} from '@angular/cdk/table';
import {MatTreeModule} from '@angular/material/tree';
import {PortalModule} from '@angular/cdk/portal';
import {MAT_MOMENT_DATE_FORMATS, MatMomentDateModule} from '@angular/material-moment-adapter';
import {
  MatToolbarModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE,
} from '@angular/material';
import * as moment from 'moment';

const MATERIAL = [
  MatToolbarModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule,
  MatMomentDateModule,
  CdkTableModule,
  PortalModule,
  MatTreeModule,
];

moment.locale('fr-ch');

@NgModule({
  imports: [MATERIAL],
  exports: [MATERIAL],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-ch'},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class MaterialModule {
}
