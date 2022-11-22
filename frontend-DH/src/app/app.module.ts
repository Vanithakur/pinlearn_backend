import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { StaticModule } from './component/static/static.module';

import { NgcCookieConsentConfig, NgcCookieConsentModule } from 'ngx-cookieconsent';

import { AppComponent } from './app.component';
import { HeaderOuterComponent } from './component/common/header-outer/header-outer.component';
import { HeaderInnerComponent } from './component/common/header-inner/header-inner.component';
import { LayoutComponent } from './component/common/layout/layout.component';
import { LayoutInnerComponent } from './component/common/layout-inner/layout-inner.component';
import { FooterComponent } from './component/common/footer/footer.component';
import { SidebarComponent } from './component/common/sidebar/sidebar.component';
import { FilterAreaComponent } from './component/common/filter-area/filter-area.component';




const cookieConfig: NgcCookieConsentConfig = {
    cookie: { domain: window.location.hostname },

    palette: {
        popup: {
            background: '#F1F1F1',
        },
        button: {
            background: '#64D3BB',
        },
    },
    theme: 'edgeless',
    type: 'info',
    layout: 'my-custom-layout',
    layouts: {
        'my-custom-layout': '{{messagelink}}{{compliance}}',
    },
    elements: {
        messagelink: `<span id="cookieconsent:desc" class="cc-message">{{message}}</span>`,
    },
    content: {
        message: 'We use cookies on our website to give you most relevant experience by remembering your preferences and repeat visits. By clicking I Accept you consent to the use of All the cookies.',
        dismiss: "I Accept",
    },
};

@NgModule({
    declarations: [
        AppComponent,
        HeaderOuterComponent,
        HeaderInnerComponent,
        LayoutComponent,
        FooterComponent,
        SidebarComponent,
        LayoutInnerComponent,
        FilterAreaComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MaterialModule,
        NgcCookieConsentModule.forRoot(cookieConfig),
        StaticModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
