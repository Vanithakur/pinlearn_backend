import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
    windowScrolled: boolean = false;
    loaded: boolean = false;
    constructor() { }

    ngOnInit(): void {
        window.addEventListener('scroll', () => {
            this.windowScrolled = window.pageYOffset > 0;
        });
    }

    scrollToTop() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }

    showLoader(event: any) {
        if (event && event.percent == 100) {
            this.loaded = true;
        }
    }

}
