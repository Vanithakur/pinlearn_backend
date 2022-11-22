import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../common/layout/layout.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AtlasComponent } from './atlas/atlas.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { MethodologyComponent } from './methodology/methodology.component';
import { ReportComponent } from './report/report.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent,
                data: { title: 'home' },
            },
            {
                path: 'methodology',
                component: MethodologyComponent,
                data: { title: 'methodology' },
            },
            {
                path: 'atlas',
                component: AtlasComponent,
                data: { title: 'atlas' },
            },
            {
                path: 'report',
                component: ReportComponent,
                data: { title: 'report' },
            },
            {
                path: 'contact',
                component: ContactComponent,
                data: { title: 'contact' },
            },
            {
                path: 'analysis',
                component: AnalysisComponent,
                data: { title: 'analysis' },
            },
            {
                path: 'analytics',
                component: AnalyticsComponent,
                data: { title: 'analytics' },
            }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StaticRoutingModule { }


