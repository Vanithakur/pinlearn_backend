import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxPrintModule } from 'ngx-print';

import { ComparativeOverviewComponent } from './comparative-overview/comparative-overview.component';
import { ComparativeResultDetailComponent } from './comparative-result-detail/comparative-result-detail.component';
import { ComparativeResultComponent } from './comparative-result/comparative-result.component';
import { ComparativeRoutingModule } from './comparative.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';



@NgModule({
    declarations: [
        ComparativeResultComponent,
        ComparativeResultDetailComponent,
        ComparativeOverviewComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComparativeRoutingModule,
        ReactiveFormsModule,
        MaterialModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts'),
        }),
        NgxPrintModule,
        NgxExtendedPdfViewerModule
    ]
})
export class ComparativeModule { }
