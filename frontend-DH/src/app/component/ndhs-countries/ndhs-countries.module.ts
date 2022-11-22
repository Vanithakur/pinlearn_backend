import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NdhsMapComponent } from '../ndhs-map/ndhs-map.component';
import { DataModalComponent } from './countries-data/data-modal/data-modal.component';
import { PieChartCardComponent } from './countries-data/pie-chart-card/pie-chart-card.component';
import { PresentDevelopmentComponent } from './countries-data/present-development/present-development.component';
import { ProspectiveDevelopmentComponent } from './countries-data/prospective-development/prospective-development.component';
import { ViewDataComponent } from './countries-data/view-data/view-data.component';
import { NdhsCountriesComponent } from './ndhs-countries.component';
import { NdhsCountriesRoutingModule } from './ndhs-countries.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NgxPrintModule } from 'ngx-print';



@NgModule({
    declarations: [
        NdhsMapComponent,
        NdhsCountriesComponent,
        ViewDataComponent,
        PresentDevelopmentComponent,
        ProspectiveDevelopmentComponent,
        PieChartCardComponent,
        DataModalComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        MaterialModule,
        NgxPrintModule,
        NgxExtendedPdfViewerModule,
        NdhsCountriesRoutingModule,
    ]
})
export class NdhsCountriesModule { }
