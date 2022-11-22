import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import { CountriesService } from 'src/app/services/countries.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
    selector: 'app-ndhs-map',
    templateUrl: './ndhs-map.component.html',
    styleUrls: ['./ndhs-map.component.css'],
})
export class NdhsMapComponent implements OnInit, AfterViewInit {
    chart: any;
    pointSeries: any;
    year: any = ['2021'];
    countries: any = [];
    circleProperties: any;
    container: any;
    root: any;
    circle: any;
    bullet: any;
    countries_2021: any;
    countries_2022: any;
    bulletColors: any;
    currentYear: any;
    selected_years: any = [];
    showLoader:boolean = true;
    showToolTip: any;
    constructor(private router: Router, private _countries: CountriesService, private utilities: UtilitiesService) {}

    ngOnInit(): void {

        if(localStorage.getItem('toolTipNdhsMap') != null ){
            this.showToolTip = JSON.parse(localStorage.getItem('toolTipNdhsMap') || '');
        }

        if (
            this.year ==
            JSON.parse(localStorage.getItem('selected_years') || '')
        ) {
            localStorage.setItem('selected_years', JSON.stringify(this.year));
        }
        this.selected_years.push(
            JSON.parse(localStorage.getItem('selected_years') || '')
        );
        if (this.selected_years && this.selected_years.length == 1) {
            this.selected_years = this.selected_years[0];
            this.year = this.selected_years;
        }

        this.utilities.sideMenu.next(1);
        document.body.scrollTop = 0;
    }

    ngAfterViewInit() {
        this.bullet = [];

        // Get all countries & filter the list for 2021 & 2022
        this._countries.getCountries().subscribe((result) => {
            this.countries = result;
            this.countries_2021 = this.countries[2021];
            this.countries_2022 = this.countries[2022];
            this.countries_2022.map((data: any) => {
                return (data.bulletColors = { fill: am5.color(0xff0000) });
            });
            this.countries_2021 &&
                this.countries_2021.map((data: any) => {
                    return (data.bulletColors = { fill: am5.color(0x7589ff) });
                });

            if (this.selected_years && this.selected_years.includes('2022') && !this.selected_years.includes('2021')) {
                this.countries = this.countries_2022;
            } else {
                this.countries = this.countries_2021;
            }
            this.showLoader = false;
            //initialize chart
            this.root = am5.Root.new('chartdiv');
            this.root._logo.dispose();
            this.root.setThemes([am5themes_Animated.new(this.root)]);

            this.chart = this.root.container.children.push(
                am5map.MapChart.new(this.root, {
                    panX: 'none',
                    panY: 'none',
                    wheelX: 'none',
                    wheelY: 'none',
                    projection: am5map.geoMercator(),
                })
            );

            // Create polygon series
            let polygonSeries = this.chart.series.push(
                am5map.MapPolygonSeries.new(this.root, {
                    geoJSON: am5geodata_worldLow,
                    exclude: ['AQ'],
                })
            );

            polygonSeries.set('fill', am5.color(0xe6e6e6));
            polygonSeries.set('stroke', am5.color(0xffffff));

            polygonSeries.mapPolygons.template.setAll({
                templateField: 'polygonSettings',
                interactive: true,
                strokeWidth: 2,
            });

            // Create point series
            this.pointSeries = this.chart.series.push(
                am5map.MapPointSeries.new(this.root, {})
            );

            this.pointSeries.bulletsContainer.children.clear();

            //change color dynamically
            let color: any = '';
            if (this.countries[0].year == '2022') {
                color = am5.color(0xff0000);
            } else {
                color = am5.color(0x7589ff);
            }

            // Push Bullets
            let count = 0;
            this.pointSeries.bullets.push(() => {
                this.container = am5.Container.new(this.root, {});

                let tooltip: any = am5.Tooltip.new(this.root, {
                    getFillFromSprite: false,
                    paddingBottom: 0,
                    paddingRight: 0,
                    paddingLeft: 0,
                    paddingTop: 0,
                    maxWidth: 200,
                });

                this.circleProperties = {
                    radius: 3,
                    tooltipY: 0,
                    fill: color,
                    strokeWidth: 0,
                    strokeOpacity: 0,
                    tooltip: tooltip,
                    tooltipHTML: `
              <div style="text-align:center; background:#fff; padding:10px; box-shadow: 0px 5px 10px rgba(111, 111, 111, 0.2); border-radius:4px;width:99px;">
              <img src="{flag}" width="20px" height="20px" style="border-radius:50%"><br>
              <span style="color:rgba(0, 0, 0, 0.32);font-size:12px;">{title}</span><div style="text-align:center;width:100%;display: flex;justify-content: center;"></div></div>
            `,
                };

                this.circle = am5.Circle.new(this.root, this.circleProperties);

                this.container.children.push(this.circle);

                this.circle.events.on('click', (e: any) => {
                    let country_id = e.target.dataItem.dataContext.country_id;
                    let country_flag = e.target.dataItem.dataContext.flagImage;
                    let country_iso_code =
                        e.target.dataItem.dataContext.iso_code;
                    let year = e.target.dataItem.dataContext.year;
                    let country_name = e.target.dataItem.dataContext.title;

                    if (localStorage.getItem('country_id') != null) {
                        localStorage.removeItem('country_id');
                        localStorage.removeItem('country_flag');
                        localStorage.removeItem('country_iso_code');
                        localStorage.removeItem('year');

                        localStorage.setItem(
                            'country_id',
                            JSON.stringify(country_id)
                        );
                        localStorage.setItem(
                            'country_flag',
                            JSON.stringify(country_flag)
                        );
                        localStorage.setItem(
                            'country_name',
                            JSON.stringify(country_name)
                        );
                        localStorage.setItem(
                            'country_iso_code',
                            JSON.stringify(country_iso_code)
                        );
                        localStorage.setItem('year', JSON.stringify(year));
                    } else {
                        localStorage.setItem(
                            'country_id',
                            JSON.stringify(country_id)
                        );
                        localStorage.setItem(
                            'country_flag',
                            JSON.stringify(country_flag)
                        );
                        localStorage.setItem(
                            'country_name',
                            JSON.stringify(country_name)
                        );
                        localStorage.setItem(
                            'country_iso_code',
                            JSON.stringify(country_iso_code)
                        );
                        localStorage.setItem('year', JSON.stringify(year));
                    }

                    this.redirectToNdhsMap();
                });
                this.circle.states.create('hover', {
                    radius: 4,
                    scale: 2,
                    strokeWidth: 3,
                    strokeOpacity: 5,
                    stroke: this.countries[count].year == 2021 ? am5.color(0x9ca9f8) : am5.color(0xff7b7b) ,
                });
                count++;

                return (this.bullet = am5.Bullet.new(this.root, {
                    sprite: this.container,
                }));
            });

            // Push Data in Pointseries
            let addCountry = (
                country_id: any,
                iso_code: any,
                longitude: number,
                latitude: number,
                title: string,
                flag: string,
                year: any
            ) => {
                this.pointSeries.data.push({
                    geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    title: title,
                    iso_code: iso_code,
                    flagImage: flag,
                    flag: '/assets/flags/' + flag,
                    country_id: country_id,
                    year: year,
                });
            };

            for (var i = 0; i < this.countries.length; i++) {
                let country = this.countries[i];
                addCountry(
                    country.id,
                    country.iso_code,
                    country.lng,
                    country.lat,
                    country.name,
                    country.flag,
                    country.year
                );
            }

            if (this.selected_years && this.selected_years.length == 2) {
                this.handleClick('2022', '2');
                // this.countries = [...this.countries_2021, ...this.countries_2022];
            }
        });
    }

    handleClick(ev: any, newData?: any) {

        this.bullet = [];
        if (newData == '1') {
            if (!this.year.includes(ev)) {
                this.year.push(ev);
            } else {
                if (this.year.length > 1) {
                    this.year.splice(this.year.indexOf(ev), 1);
                } else {
                    ev.preventDefault();
                }
            }

            localStorage.removeItem('selected_years');
            localStorage.setItem('selected_years', JSON.stringify(this.year));

            let selectedYear = JSON.parse(
                localStorage.getItem('selected_years') || ''
            );
            if (selectedYear && selectedYear.length == 1) {
                if (selectedYear[0] == 2022) {
                    localStorage.removeItem('selected_country');
                    localStorage.setItem(
                        'selected_country',
                        environment.default_country_2022
                    );
                } else {
                    localStorage.removeItem('selected_country');
                    localStorage.setItem(
                        'selected_country',
                        environment.default_country_2021
                    );
                }
            }
        }

        this.countries = [];
        if (this.year.includes('2022') && this.year.includes('2021')) {
            this.countries = [...this.countries_2021, ...this.countries_2022];
        } else if (this.year.includes('2021')) {
            this.countries = this.countries_2021;
            localStorage.setItem('country_id', JSON.stringify('14'));
            localStorage.setItem('country_flag', JSON.stringify('au.png'));
            localStorage.setItem('country_iso_code', JSON.stringify('AU'));
            localStorage.setItem('country_name', JSON.stringify('Australia'));
            localStorage.setItem('year', '2021');
        } else if (this.year.includes('2022')) {
            this.countries = this.countries_2022;
            localStorage.setItem('country_id', JSON.stringify('44'));
            localStorage.setItem('country_flag', JSON.stringify('cl.png'));
            localStorage.setItem('country_iso_code', JSON.stringify('CL'));
            localStorage.setItem('country_name', JSON.stringify('Chile'));
            localStorage.setItem('year', '2022');
        }

        this.pointSeries.dispose();
        this.pointSeries.bulletsContainer.children.clear();

        this.pointSeries = this.chart.series.push(
            am5map.MapPointSeries.new(this.root, {})
        );
        let count = 0;
        this.pointSeries.bullets.push(() => {

            this.container = am5.Container.new(this.root, {});

            let tooltip: any = am5.Tooltip.new(this.root, {
                getFillFromSprite: false,
                paddingBottom: 0,
                paddingRight: 0,
                paddingLeft: 0,
                paddingTop: 0,
                maxWidth: 200,
            });

            tooltip.get('background').setAll({
                fill: am5.color(0xffffff),
            });

            this.circleProperties = {
                templateField: 'circleTemplate',
                radius: 3,
                tooltipY: 0,
                strokeWidth: 0,
                strokeOpacity: 0,
                tooltip: tooltip,
                tooltipHTML: `
            <div style="text-align:center; background:#fff; padding:10px;width:100px; box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2); border-radius:4px;">
            <img src="{flag}" width="20px" height="20px" style="border-radius:50%"><br>
            <span style="color:rgba(0, 0, 0, 0.32);font-size:12px;">{title}</span><div style="text-align:center;width:100%;display: flex;justify-content: center;"></div></div>
            `,
            };

            this.circle = am5.Circle.new(this.root, this.circleProperties);
            this.container.children.push(this.circle);

            this.circle.states.create('hover', {
                radius: 4,
                scale: 2,
                fill: this.countries[count].year == 2021 ? am5.color(0x7589ff) : am5.color(0xff0000) ,
                strokeWidth: 3,
                strokeOpacity: 5,
                stroke: this.countries[count].year == 2021 ? am5.color(0x9ca9f8) : am5.color(0xff7b7b) ,
            });

            this.circle.events.on('click', (e: any) => {
                let country_id = e.target.dataItem.dataContext.country_id;
                let country_flag = e.target.dataItem.dataContext.flagImage;
                let country_iso_code = e.target.dataItem.dataContext.iso_code;
                let year = e.target.dataItem.dataContext.year;
                let country_name = e.target.dataItem.dataContext.title;

                if (localStorage.getItem('country_id') != null) {
                    localStorage.removeItem('country_id');
                    localStorage.removeItem('country_flag');
                    localStorage.removeItem('country_iso_code');
                    localStorage.removeItem('year');
                    localStorage.removeItem('country_name');

                    localStorage.setItem(
                        'country_id',
                        JSON.stringify(country_id)
                    );
                    localStorage.setItem(
                        'country_flag',
                        JSON.stringify(country_flag)
                    );
                    localStorage.setItem(
                        'country_name',
                        JSON.stringify(country_name)
                    );
                    localStorage.setItem(
                        'country_iso_code',
                        JSON.stringify(country_iso_code)
                    );
                    localStorage.setItem('year', JSON.stringify(year));
                } else {
                    localStorage.setItem(
                        'country_id',
                        JSON.stringify(country_id)
                    );
                    localStorage.setItem(
                        'country_flag',
                        JSON.stringify(country_flag)
                    );
                    localStorage.setItem(
                        'country_name',
                        JSON.stringify(country_name)
                    );
                    localStorage.setItem(
                        'country_iso_code',
                        JSON.stringify(country_iso_code)
                    );
                    localStorage.setItem('year', JSON.stringify(year));
                }

                this.redirectToNdhsMap();
            });
            count++;
            return (this.bullet = am5.Bullet.new(this.root, {
                sprite: this.container,
            }));


        });

        let addCountry = (
            country_id: any,
            iso_code: any,
            longitude: number,
            latitude: number,
            title: string,
            flag: string,
            bulletColors: any,
            year: any
        ) => {
            this.pointSeries.data.push({
                geometry: { type: 'Point', coordinates: [longitude, latitude] },
                title: title,
                iso_code: iso_code,
                flagImage: flag,
                flag: '/assets/flags/' + flag,
                circleTemplate: bulletColors,
                country_id: country_id,
                year: year,
            });
        };
        for (var i = 0; i < this.countries.length; i++) {
            let country = this.countries[i];
            addCountry(
                country.id,
                country.iso_code,
                country.lng,
                country.lat,
                country.name,
                country.flag,
                country.bulletColors,
                country.year
            );
        }
    }

    handleToolTip() {
        this.showToolTip = false;
        localStorage.setItem('toolTipNdhsMap', JSON.stringify(false));
    }

    redirectToNdhsMap() {
        this.router.navigate(['../ndhs/ndhs-countries']);
    }

}
