import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalysisComponent } from './analysis/analysis.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AtlasComponent } from './atlas/atlas.component';
import { ContactComponent } from './contact/contact.component';
import { MethodologyComponent } from './methodology/methodology.component';
import { ReportComponent } from './report/report.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StaticRoutingModule } from './static.routing.module';
import { HomeComponent } from './home/home.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
    declarations: [
        HomeComponent,
        MethodologyComponent,
        AtlasComponent,
        ContactComponent,
        AnalysisComponent,
        AnalyticsComponent,
        ReportComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        NgxEchartsModule,
        StaticRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NgxExtendedPdfViewerModule
    ],
    exports: []
})
export class StaticModule { }
