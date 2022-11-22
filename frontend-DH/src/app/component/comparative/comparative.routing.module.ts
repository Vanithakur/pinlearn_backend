import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutInnerComponent } from '../common/layout-inner/layout-inner.component';
import { ComparativeOverviewComponent } from './comparative-overview/comparative-overview.component';
import { ComparativeResultDetailComponent } from './comparative-result-detail/comparative-result-detail.component';
import { ComparativeResultComponent } from './comparative-result/comparative-result.component';



const routes: Routes = [
    {
        path: '',
        component: LayoutInnerComponent,
        children: [
            {
                path: 'comparative-result',
                component: ComparativeResultComponent,
                data: { title: 'Comparative-Result' },
            },
            {
                path: 'comparative-result-detail',
                component: ComparativeResultDetailComponent,
                data: { title: 'Comparative-Result-Detail' },
            },
            {
                path: 'comparative-overview',
                component: ComparativeOverviewComponent,
                data: { title: 'Comparative-Overview' },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComparativeRoutingModule { }


