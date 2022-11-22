import {
    AfterViewInit,
    Component,
    Inject,
    NgZone,
    OnDestroy,
    OnInit,
    PLATFORM_ID,
} from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { CommonService } from 'src/app/services/common.service';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-ndhs-countries',
    templateUrl: './ndhs-countries.component.html',
    styleUrls: ['./ndhs-countries.component.css'],
})
export class NdhsCountriesComponent
    implements OnInit, AfterViewInit, OnDestroy {
    showFiller = false;
    title: any;

    countries: any = [];

    ndhs_details: any;
    data_new: any = [];
    digital_taxonomies_present: any = [];
    digital_taxonomies_prospective: any = [];
    health_taxonomies_prospective: any = [];
    health_taxonomies_present: any = [];

    readiness_score: any;
    availability_score: any;
    capacity_building_score: any;
    development_strategy_score: any;

    country_id: any;
    country_flag: any;
    country_iso_code: any;

    country_list: any;
    currentYear: any;
    governance_id: any;
    showLoader: boolean = true;
    chart: any;
    triggerInit: boolean = true;
    country_name: any;

    constructor(
        private _utilities: UtilitiesService,
        private _common: CommonService,
        @Inject(PLATFORM_ID) private platformId: Object,
        private zone: NgZone
    ) { }

    browserOnly(f: () => void) {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                f();
            });
        }
    }

    ngOnInit(): void {
        this._utilities.showHeaderMenu.next(true);

        this._utilities.governanceTypeSource.subscribe((governanceId) => {
            this.data_new = [];
            this.health_taxonomies_prospective = [];
            this.health_taxonomies_present = [];
            this.digital_taxonomies_present = [];
            this.digital_taxonomies_prospective = [];
            this.showLoader = true;

            if (this.triggerInit) {
                this.getNdhsDetails(governanceId);
            }
        });
    }

    getNdhsDetails(governanceId: any) {
        this.data_new = [];
        this.health_taxonomies_prospective = [];
        this.health_taxonomies_present = [];
        this.digital_taxonomies_present = [];
        this.digital_taxonomies_prospective = [];

        this.country_id = JSON.parse(localStorage.getItem('country_id') || '');
        this.country_name = JSON.parse(
            localStorage.getItem('country_name') || ''
        );
        this.country_flag = JSON.parse(
            localStorage.getItem('country_flag') || ''
        );
        this.country_iso_code = JSON.parse(
            localStorage.getItem('country_iso_code') || ''
        );
        this.currentYear = JSON.parse(localStorage.getItem('year') || '');
        this.governance_id = JSON.parse(
            localStorage.getItem('governance_id') || ''
        );

        this._common
            .getNdhsDetails(governanceId, this.country_id, this.currentYear)
            .subscribe((result) => {
                this.ndhs_details = result;
                let present_data:any = Object.values(result)[0];
                let prospective_data:any = Object.values(result)[1];

                let presentDevelopment = Object.values(present_data);
                let prospectiveDevelopment = Object.values(prospective_data);


                if (governanceId == 1) {
                    presentDevelopment.forEach(
                        (element: any) => {
                            element.sort(function (a: any, b: any) { return (a.ultimate_name > b.ultimate_name) ? 1 : ((b.ultimate_name > a.ultimate_name) ? -1 : 0); });

                                let readiness_score = parseInt(
                                    element[1].score
                                );
                                let availability_score = parseInt(
                                    element[0].score
                                );
                                let readiness_percentage = Math.round(
                                    this.getPercantage(readiness_score)
                                );
                                let availability_percentage = Math.round(
                                    this.getPercantage(availability_score)
                                );
                                let total_percentage = Math.round(this.getPercantage(readiness_score +
                                    availability_score));
                                let remaining_percentage =
                                    100 - total_percentage;
                                let details = {
                                    title: element[0].taxonomy_name,
                                    governance_type: 'health',
                                    developement_type: 'present',
                                    readiness_score: readiness_score,
                                    availability_score: availability_score,
                                    readiness_percentage: readiness_percentage,
                                    availability_percentage:
                                        availability_percentage,
                                    remaining_percentage: remaining_percentage,
                                    taxonomy_id: element[0].taxonomy_id,
                                    development_id:
                                        element[0].development_id,
                                    governance_id:
                                        element[0].governance_id,
                                    prefix: 'health_present',
                                    total_percentage:total_percentage,
                                };
                                this.data_new.push(details);
                                this.health_taxonomies_present.push(details);
                        }
                    );

                   prospectiveDevelopment.forEach(
                        (element: any) => {

                            element.sort(function (a: any, b: any) { return (a.ultimate_name > b.ultimate_name) ? 1 : ((b.ultimate_name > a.ultimate_name) ? -1 : 0); });
                                let capacity_building_score = parseInt(
                                    element[0].score
                                );
                                let development_strategy_score = parseInt(
                                    element[1].score
                                );
                                let capacity_building_percentage = Math.round(
                                    this.getPercantage(capacity_building_score)
                                );
                                let development_strategy_percentage =
                                    Math.round(
                                        this.getPercantage(
                                            development_strategy_score
                                        )
                                    );
                                let total_percentage = Math.round(this.getPercantage(capacity_building_score +
                                    development_strategy_score));
                                let remaining_percentage =
                                    100 - total_percentage;
                                let details = {
                                    title: element[0].taxonomy_name,
                                    governance_type: 'health',
                                    developement_type: 'prospective',
                                    capacity_building_score:
                                        capacity_building_score,
                                    development_strategy_score:
                                        development_strategy_score,
                                    capacity_building_percentage:
                                        capacity_building_percentage,
                                    development_strategy_percentage:
                                        development_strategy_percentage,
                                    remaining_percentage: remaining_percentage,
                                    taxonomy_id: element[0].taxonomy_id,
                                    development_id:
                                        element[0].development_id,
                                    governance_id:
                                        element[0].governance_id,
                                    prefix: 'health_prospective',
                                    total_percentage:total_percentage,
                                };
                                this.data_new.push(details);
                                this.health_taxonomies_prospective.push(
                                    details
                                );
                        }
                    );
                    this.health_taxonomies_present.sort(function(a:any,b:any) {return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);} );
                    this.health_taxonomies_prospective.sort(function(a:any,b:any) {return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);} );
                } else {
                  presentDevelopment.forEach(
                        (element: any) => {
                            element.sort(function (a: any, b: any) { return (a.ultimate_name > b.ultimate_name) ? 1 : ((b.ultimate_name > a.ultimate_name) ? -1 : 0); });
                                let readiness_score = parseInt(
                                    element[1].score
                                );
                                let availability_score = parseInt(
                                    element[0].score
                                );
                                let readiness_percentage = Math.round(
                                    this.getPercantage(readiness_score)
                                );
                                let availability_percentage = Math.round(
                                    this.getPercantage(availability_score)
                                );

                                let total_percentage = Math.round(this.getPercantage(readiness_score +
                                    availability_score));

                                let remaining_percentage =
                                    100 - total_percentage;
                                let details = {
                                    title: element[0].taxonomy_name,
                                    governance_type: 'health',
                                    developement_type: 'present',
                                    readiness_score: readiness_score,
                                    availability_score: availability_score,
                                    readiness_percentage: readiness_percentage,
                                    availability_percentage:
                                        availability_percentage,
                                    remaining_percentage: remaining_percentage,
                                    taxonomy_id: element[0].taxonomy_id,
                                    development_id:
                                        element[0].development_id,
                                    governance_id:
                                        element[0].governance_id,
                                    prefix: 'digital_present',
                                    total_percentage:total_percentage,
                                };

                                this.data_new.push(details);
                                this.digital_taxonomies_present.push(details);
                        }
                    );

                    prospectiveDevelopment.forEach(
                        (element: any) => {
                            element.sort(function (a: any, b: any) { return (a.ultimate_name > b.ultimate_name) ? 1 : ((b.ultimate_name > a.ultimate_name) ? -1 : 0); });
                            let capacity_building_score = parseInt(
                                    element[0].score
                                );
                                let development_strategy_score = parseInt(
                                    element[1].score
                                );
                                let capacity_building_percentage = Math.round(
                                    this.getPercantage(capacity_building_score)
                                );
                                let development_strategy_percentage =
                                    Math.round(
                                        this.getPercantage(
                                            development_strategy_score
                                        )
                                    );
                                let total_percentage = Math.round(this.getPercantage(capacity_building_score +
                                    development_strategy_score));
                                let remaining_percentage =
                                    100 - total_percentage;
                                let details = {
                                    title: element[0].taxonomy_name,
                                    governance_type: 'health',
                                    developement_type: 'prospective',
                                    capacity_building_score:
                                        capacity_building_score,
                                    development_strategy_score:
                                        development_strategy_score,
                                    capacity_building_percentage:
                                        capacity_building_percentage,
                                    development_strategy_percentage:
                                        development_strategy_percentage,
                                    remaining_percentage: remaining_percentage,
                                    taxonomy_id: element[0].taxonomy_id,
                                    development_id:
                                        element[0].development_id,
                                    governance_id:
                                        element[0].governance_id,
                                    prefix: 'digital_prospective',
                                    total_percentage:total_percentage,
                                };
                                this.data_new.push(details);
                                this.digital_taxonomies_prospective.push(
                                    details
                                );
                        }
                    );
                    this.digital_taxonomies_present.sort(function(a:any,b:any) {return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);} );
                    this.digital_taxonomies_prospective.sort(function(a:any,b:any) {return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);} );

                }

                this.getExistedCountriesList();

                this.ngAfterViewInit();
                this.showLoader = false;
            });
    }

    getPercantage(value: number) {
        let per = (value * 100) / 200;
        return per;
    }

    ngAfterViewInit() {
        // am4core.useTheme(am4themes_animated);
        this.browserOnly(() => {
            if (this.governance_id == 1) {
                setTimeout(() => {

                    this.health_taxonomies_present.forEach(
                        (taxonomy: any, index: number) => {
                            let i = 1;
                            this.chart = am4core.create(
                                'chartdiv_health_present' + (taxonomy.taxonomy_id),
                                am4charts.PieChart3D
                            );

                            if (this.chart.logo) {
                                this.chart.logo.disabled = true;
                            }

                            this.chart.preloader.show();
                            this.chart.preloader.defaultState.transitionDuration = 0;

                            this.title = taxonomy.title;
                            this.availability_score =
                                taxonomy.availability_score;
                            this.readiness_score = taxonomy.readiness_score;

                            // this.chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

                            this.chart.data = [
                                {
                                    taxonomy: 'Readiness',
                                    percentage: taxonomy.readiness_percentage,
                                },
                                {
                                    taxonomy: 'Avaliability',
                                    percentage:
                                        taxonomy.availability_percentage,
                                },
                                {
                                    percentage: taxonomy.remaining_percentage,
                                },
                            ];

                            this.chart.innerRadius = 40;
                            this.chart.depth = 10;

                            let series = this.chart.series.push(
                                new am4charts.PieSeries3D()
                            );
                            series.dataFields.value = 'percentage';
                            series.dataFields.category = 'taxonomy';

                            series.colors.list = [
                                '#1181B2',
                                '#05D5AA',
                                '#E2E2E4',
                            ].map(function (color) {
                                return new (am4core.color as any)(color);
                            });

                            var label = series.createChild(am4core.Label);
                            label.text = taxonomy.total_percentage + '%';
                            label.horizontalCenter = 'middle';
                            label.verticalCenter = 'middle';
                            label.fontSize = 26;
                            label.fontWeight = 'normal';

                            series.ticks.template.events.on('ready', hideSmall);
                            series.ticks.template.events.on(
                                'visibilitychanged',
                                hideSmall
                            );
                            series.labels.template.events.on(
                                'ready',
                                hideSmall
                            );
                            series.labels.template.events.on(
                                'visibilitychanged',
                                hideSmall
                            );
                            series.labels.template.maxWidth = 70;
                            series.labels.template.wrap = true;

                            function hideSmall(ev: any) {
                                if (
                                    ev.target.dataItem.hasProperties == false ||
                                    ev.target.dataItem.dataContext.percentage ==
                                    0
                                ) {
                                    ev.target.hide();
                                } else {
                                    ev.target.show();
                                }
                            }

                            series.labels.template.text = '{taxonomy}';

                            series.slices.template.tooltipText = '{category}';
                            series.fontSize = '10';
                            series.fontWeight = 'bold';
                        }
                    );

                    this.health_taxonomies_prospective.forEach(
                        (taxonomy: any, index: number) => {
                            let i = 1;
                            this.chart = am4core.create(
                                'chartdiv_health_prospective' + (taxonomy.taxonomy_id),
                                am4charts.PieChart3D
                            );

                            if (this.chart.logo) {
                                this.chart.logo.disabled = true;
                            }

                            this.title = taxonomy.title;
                            this.capacity_building_score =
                                taxonomy.capacity_building_score;
                            this.development_strategy_score =
                                taxonomy.development_strategy_score;

                            //this.chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

                            this.chart.data = [
                                {
                                    taxonomy: 'Capacity Building',
                                    percentage:
                                        taxonomy.capacity_building_percentage,
                                },
                                {
                                    taxonomy: 'Development Strategy',
                                    percentage:
                                        taxonomy.development_strategy_percentage,
                                },
                                {
                                    percentage: taxonomy.remaining_percentage,
                                },
                            ];

                            this.chart.innerRadius = 40;
                            this.chart.depth = 10;

                            let series = this.chart.series.push(
                                new am4charts.PieSeries3D()
                            );
                            series.dataFields.value = 'percentage';
                            series.dataFields.category = 'taxonomy';

                            series.colors.list = [
                                '#2F4770',
                                '#0860FE',
                                '#E2E2E4',
                            ].map(function (color) {
                                return new (am4core.color as any)(color);
                            });

                            var label = series.createChild(am4core.Label);
                            label.text = taxonomy.total_percentage + '%'
                            label.horizontalCenter = 'middle';
                            label.verticalCenter = 'middle';
                            label.fontSize = 26;
                            label.fontWeight = 'normal';

                            series.ticks.template.events.on('ready', hideSmall);
                            series.ticks.template.events.on(
                                'visibilitychanged',
                                hideSmall
                            );
                            series.labels.template.events.on(
                                'ready',
                                hideSmall
                            );
                            series.labels.template.events.on(
                                'visibilitychanged',
                                hideSmall
                            );
                            series.labels.template.maxWidth = 70;
                            series.labels.template.wrap = true;

                            function hideSmall(ev: any) {
                                if (
                                    ev.target.dataItem.hasProperties == false ||
                                    ev.target.dataItem.dataContext.percentage ==
                                    0
                                ) {
                                    ev.target.hide();
                                } else {
                                    ev.target.show();
                                }
                            }

                            series.labels.template.text = '{taxonomy}';

                            series.slices.template.tooltipText = '{category}';
                            series.fontSize = '9';
                            series.fontWeight = 'bold';
                        }
                    );
                }, 100);
            } else {
                setTimeout(() => {
                    this.digital_taxonomies_present.forEach(
                        (taxonomy: any, index: number) => {
                            let i = 6;
                            this.chart = am4core.create(
                                'chartdiv_digital_present' + (taxonomy.taxonomy_id),
                                am4charts.PieChart3D
                            );

                            if (this.chart.logo) {
                                this.chart.logo.disabled = true;
                            }

                            this.title = taxonomy.title;
                            this.availability_score =
                                taxonomy.availability_score;
                            this.readiness_score = taxonomy.readiness_score;

                            //this.chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

                            this.chart.data = [
                                {
                                    taxonomy: 'Readiness',
                                    percentage: taxonomy.readiness_percentage,
                                },
                                {
                                    taxonomy: 'Avaliability',
                                    percentage:
                                        taxonomy.availability_percentage,
                                },
                                {
                                    percentage: taxonomy.remaining_percentage,
                                },
                            ];

                            this.chart.innerRadius = 40;
                            this.chart.depth = 10;

                            let series = this.chart.series.push(
                                new am4charts.PieSeries3D()
                            );
                            series.dataFields.value = 'percentage';
                            series.dataFields.category = 'taxonomy';

                            series.colors.list = [
                                '#71ADB5',
                                '#1F914F',
                                '#E2E2E4',
                            ].map(function (color) {
                                return new (am4core.color as any)(color);
                            });

                            var label = series.createChild(am4core.Label);
                            label.text = taxonomy.total_percentage + '%'
                            label.horizontalCenter = 'middle';
                            label.verticalCenter = 'middle';
                            label.fontSize = 26;
                            label.fontWeight = 'normal';

                            series.ticks.template.events.on('ready', hideSmall);
                            series.ticks.template.events.on(
                                'visibilitychanged',
                                hideSmall
                            );
                            series.labels.template.events.on(
                                'ready',
                                hideSmall
                            );
                            series.labels.template.events.on(
                                'visibilitychanged',
                                hideSmall
                            );
                            series.labels.template.maxWidth = 70;
                            series.labels.template.wrap = true;

                            function hideSmall(ev: any) {
                                if (
                                    ev.target.dataItem.hasProperties == false ||
                                    ev.target.dataItem.dataContext.percentage ==
                                    0
                                ) {
                                    ev.target.hide();
                                } else {
                                    ev.target.show();
                                }
                            }

                            series.labels.template.text = '{taxonomy}';

                            series.slices.template.tooltipText = '{category}';
                            series.fontSize = '9';
                            series.fontWeight = 'bold';
                        }
                    );

                    this.digital_taxonomies_prospective.forEach(
                        (taxonomy: any, index: number) => {
                            let i = 6;
                            this.chart = am4core.create(
                                'chartdiv_digital_prospective' + (taxonomy.taxonomy_id),
                                am4charts.PieChart3D
                            );

                            if (this.chart.logo) {
                                this.chart.logo.disabled = true;
                            }

                            this.title = taxonomy.title;
                            this.capacity_building_score =
                                taxonomy.capacity_building_score;
                            this.development_strategy_score =
                                taxonomy.development_strategy_score;

                            //this.chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

                            this.chart.data = [
                                {
                                    taxonomy: 'Capacity Building',
                                    percentage:
                                        taxonomy.capacity_building_percentage,
                                },
                                {
                                    taxonomy: 'Development Strategy',
                                    percentage:
                                        taxonomy.development_strategy_percentage,
                                },
                                {
                                    percentage: taxonomy.remaining_percentage,
                                },
                            ];

                            this.chart.innerRadius = 40;
                            this.chart.depth = 10;

                            let series = this.chart.series.push(
                                new am4charts.PieSeries3D()
                            );
                            series.dataFields.value = 'percentage';
                            series.dataFields.category = 'taxonomy';

                            series.colors.list = [
                                '#14CCAA',
                                '#41565A',
                                '#E2E2E4',
                            ].map(function (color) {
                                return new (am4core.color as any)(color);
                            });

                            var label = series.createChild(am4core.Label);
                            label.text = taxonomy.total_percentage + '%'
                            label.horizontalCenter = 'middle';
                            label.verticalCenter = 'middle';
                            label.fontSize = 26;
                            label.fontWeight = 'normal';

                            series.ticks.template.events.on('ready', hideSmall);
                            series.ticks.template.events.on(
                                'visibilitychanged',
                                hideSmall
                            );
                            series.labels.template.events.on(
                                'ready',
                                hideSmall
                            );
                            series.labels.template.events.on(
                                'visibilitychanged',
                                hideSmall
                            );
                            series.labels.template.maxWidth = 70;
                            series.labels.template.wrap = true;

                            function hideSmall(ev: any) {
                                if (
                                    ev.target.dataItem.hasProperties == false ||
                                    ev.target.dataItem.dataContext.percentage ==
                                    0
                                ) {
                                    ev.target.hide();
                                } else {
                                    ev.target.show();
                                }
                            }

                            series.labels.template.text = '{taxonomy}';

                            series.slices.template.tooltipText = '{category}';
                            series.fontSize = '9';
                            series.fontWeight = 'bold';
                        }
                    );
                }, 100);
            }
        });
    }

    getExistedCountriesList() {
        let data = {
            year: this.currentYear,
        };

        this._common.getExistedCountries(data).subscribe((result) => {
            this.country_list = result;
        });

    }

    onCountryChange(event: any) {
        let searchedTerm = event.target.value;
        if (searchedTerm) {
            this.country_list = this.country_list.filter((item: any) => {
                return item.country_name
                    .toLowerCase()
                    .includes(searchedTerm.toLowerCase());
            });
        } else {
            this.getExistedCountriesList();
        }
    }

    selectCountry(country: any) {
        this.showLoader = true;

        if (country) {
            this.country_id = country.country_id;
            this.country_flag = country.flag;
            this.country_iso_code = country.iso_code;
            this.country_name = country.country_name;
            this.currentYear = country.year;

            if (localStorage.getItem('country_id') != null) {
                localStorage.removeItem('country_id');
                localStorage.removeItem('country_flag');
                localStorage.removeItem('country_iso_code');
                localStorage.removeItem('country_name');
                localStorage.removeItem('year');

                localStorage.setItem(
                    'country_id',
                    JSON.stringify(this.country_id)
                );
                localStorage.setItem(
                    'country_name',
                    JSON.stringify(this.country_name)
                );
                localStorage.setItem(
                    'country_flag',
                    JSON.stringify(this.country_flag)
                );
                localStorage.setItem(
                    'country_iso_code',
                    JSON.stringify(this.country_iso_code)
                );
                localStorage.setItem('year', JSON.stringify(this.currentYear));
            } else {
                localStorage.setItem(
                    'country_id',
                    JSON.stringify(this.country_id)
                );
                localStorage.setItem(
                    'country_flag',
                    JSON.stringify(this.country_flag)
                );
                localStorage.setItem(
                    'country_iso_code',
                    JSON.stringify(this.country_iso_code)
                );
                localStorage.setItem('year', JSON.stringify(this.currentYear));
            }

            this.getNdhsDetails(this.governance_id);
        }
    }

    toggle(num: number) {
        this.governance_id = num;
        localStorage.setItem('governance_id', JSON.stringify(num));
        this._utilities.governanceTypeSource.next(num);

    }

    ngOnDestroy(): void {
        this._utilities.showHeaderMenu.next(false);
        this._utilities.governanceTypeSource.unsubscribe;
        this.triggerInit = false;
        this.showLoader = true;

        // this.browserOnly(() => {
        //     if (this.chart) {
        //         this.chart.dispose();
        //         am4core.disposeAllCharts();
        //     }
        // });
    }
}
