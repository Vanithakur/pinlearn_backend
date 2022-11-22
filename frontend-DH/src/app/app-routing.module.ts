import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },

    {
        path: 'ndhs',
        loadChildren: () => import('./component/ndhs-countries/ndhs-countries.module').then(m => m.NdhsCountriesModule)
    },

    {
        path: 'comparative',
        loadChildren: () => import('./component/comparative/comparative.module').then(m => m.ComparativeModule)
    },


    {
        path: '**',
        redirectTo: '/home',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
