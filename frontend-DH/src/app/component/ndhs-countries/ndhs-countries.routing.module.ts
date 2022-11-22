import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutInnerComponent } from '../common/layout-inner/layout-inner.component';
import { NdhsMapComponent } from '../ndhs-map/ndhs-map.component';
import { PresentDevelopmentComponent } from './countries-data/present-development/present-development.component';
import { ProspectiveDevelopmentComponent } from './countries-data/prospective-development/prospective-development.component';
import { ViewDataComponent } from './countries-data/view-data/view-data.component';
import { NdhsCountriesComponent } from './ndhs-countries.component';



const routes: Routes = [
    {
        path: '',
        component: LayoutInnerComponent,
        children: [
            {
                path: 'ndhs-map',
                component: NdhsMapComponent,
                data: { title: 'NDHS-Map' },
            },
            {
                path: 'ndhs-countries',
                component: NdhsCountriesComponent,
                data: { title: 'Countries' },
            },
            {
                path: 'view-data',
                component: ViewDataComponent,
                data: { title: 'View-Data' },
            },
            {
                path: 'present-development',
                component: PresentDevelopmentComponent,
                data: { title: 'Present-Development' },
            },
            {
                path: 'prospective-development',
                component: ProspectiveDevelopmentComponent,
                data: { title: 'Prospective-Development' },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NdhsCountriesRoutingModule { }


