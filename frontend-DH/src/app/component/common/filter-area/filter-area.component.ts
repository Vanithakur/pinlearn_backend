import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
    selector: 'app-filter-area',
    templateUrl: './filter-area.component.html',
    styleUrls: ['./filter-area.component.css'],
})
export class FilterAreaComponent {
    checked: boolean = true;
    constructor(private location: Location, public utilities:UtilitiesService) {}

    ngOnInit(): void {}
    previousPage() {
        this.location.back();
    }
    handleClick() {
        this.checked = this.checked ? false : true;
        this.utilities.sideMenu.next(this.checked);
    }
}
