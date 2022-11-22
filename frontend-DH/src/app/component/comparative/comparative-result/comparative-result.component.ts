import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormControl } from '@angular/forms';
import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
// import * as echarts from 'echarts';
import data from 'src/assets/data/network2.json';
import { CountriesService } from 'src/app/services/countries.service';
import { CommonService } from 'src/app/services/common.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am4plugins_forceDirected from '@amcharts/amcharts4/plugins/forceDirected';
import * as tree_data from 'src/assets/data/tree';

@Component({
    selector: 'app-comparative-result',
    templateUrl: './comparative-result.component.html',
    styleUrls: ['./comparative-result.component.css'],
})
export class ComparativeResultComponent implements OnInit, AfterViewInit {
    networkData: any = data;
    mySelections: any = [];
    country_ids: any;
    countriesForm = new FormControl();
    countries_2021: any;
    countries_2022: any;
    selected_countries: any;
    comparitive_countries: any = [];
    readiness: any = [];
    availability: any = [];
    capacity_building: any = [];
    development_strategy: any = [];
    country_list: any;
    mapDataInfo: any = [];
    chart: any;
    pointSeries: any;
    year: any = ['2022'];
    countries: any = [];
    circleProperties: any;
    container: any;
    root: any;
    circle: any;
    bullet: any;
    bulletColors: any;
    currentYear: any;
    default_contry_list: any;
    mainMapData: any = [];
    filterCountry: any;
    polygonSeries: any;
    selected_langth = 2;
    @ViewChild('main') main: ElementRef | any;
    @ViewChild('mySelect') mySelect: ElementRef | any;
    loading: boolean = false;
    spinner: boolean = false;
    count: any;
    selecte_array: any = [];
    // @ViewChild() selectedMapData: any;

    constructor(
        private _countries: CountriesService,
        private _common: CommonService,
        private _utilities: UtilitiesService
    ) { }

    ngOnInit(): void {
        // Get all countries
        let self = this;
        this.count = 1;
        this._utilities.showHeaderMenu.next(false);

        let selectedYear = JSON.parse(
            localStorage.getItem('selected_years') || ''
        );

        if (Array.isArray(selectedYear)) {
            this.year =
                selectedYear && selectedYear[0] ? selectedYear[0] : this.year;
        } else {
            this.year = selectedYear;
        }
        this.currentYear = this.year;

        if (localStorage.getItem('selected_country')) {
            this.country_ids = localStorage.getItem('selected_country');
        } else {
            if (this.year == 2022) {
                this.country_ids = environment.default_country_2022;
            } else {
                this.country_ids = environment.default_country_2021;
            }
        }

        let data = {
            year: this.year,
        };
        this._common.getExistedCountries(data).subscribe((result) => {
            this.country_list = result;
        });

        this.updateDefaultCountryList(this.country_ids);

        this.getComparativeData();
    }

    updateDefaultCountryList(country_ids: any) {
        let default_contry = {
            countries: country_ids,
        };

        this._common.getdefaultCountry(default_contry).subscribe((result) => {
            this.default_contry_list = result;
            let selectedOption: any = [];
            this.mySelections = [];
            result.forEach((element: any, index: any) => {
                selectedOption.push(element.country_id);
                this.mySelections.push(element.country_id);
            });
            this.countriesForm.setValue(selectedOption);
            if (this.count == 1) {
                this.selecte_array = this.countriesForm.value;
                this.count = 2;
            }
        });
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.mainMap();

            am4core.useTheme(am4themes_animated);

            var chart = am4core.create("Treechartmini", am4plugins_forceDirected.ForceDirectedTree);
            if (chart.logo) {
                chart.logo.disabled = true;
            }
            var series = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());

            series.data = tree_data.default;

            series.dataFields.linkWith = "linkWith";
            series.dataFields.name = "name";
            series.dataFields.id = "name";
            series.dataFields.value = "value";
            series.dataFields.children = "children";
            series.dataFields.fixed = "fixed";
            series.dataFields.color = 'color';

            series.nodes.template.propertyFields.x = "x";
            series.nodes.template.propertyFields.y = "y";

            series.nodes.template.tooltipText = "{name}";
            series.nodes.template.fillOpacity = 1;

            series.nodes.template.label.text = "{text}"
            series.fontSize = 7;
            series.maxLevels = 4;
            series.nodes.template.label.hideOversized = true;
            series.nodes.template.label.truncate = true;

            series.nodes.template.strokeWidth = 4;
            series.links.template.strokeOpacity = 1;
            series.nodes.template.outerCircle.strokeOpacity = 1;
            series.nodes.template.outerCircle.fillOpacity = 1;
            series.nodes.template.togglable = false;
            series.minRadius = 0.8;
            // series.maxRadius = 22;

            // var chartDom = this.main.nativeElement;
            // var myChart = echarts.init(chartDom);
            // var option: any;

            // this.networkData.nodes.forEach(function (node: any) {
            //     node.label = {
            //         show: node.symbolSize > 30,
            //     };
            // });
            // option = {
            //     title: {
            //         text: '',
            //         subtext: '',
            //         top: 'bottom',
            //         left: 'right',
            //     },
            //     tooltip: {
            //         trigger: 'item',
            //         formatter: function (params: any) {
            //             if (params.data.name) {
            //                 return params.name;
            //             }
            //             return;
            //         },
            //     },
            //     series: [
            //         {
            //             name: '',
            //             type: 'graph',
            //             layout: 'none',
            //             data: this.networkData.nodes,
            //             links: this.networkData.links,
            //             categories: this.networkData.categories,
            //             roam: false,
            //             label: {
            //                 color: '#fff',
            //                 position: 'inside',
            //                 align: 'center',
            //                 formatter: '{b}',
            //                 verticalAlign: 'middle',
            //                 fontSize: '10',
            //             },
            //             lineStyle: {
            //                 color: 'source',
            //                 curveness: 0.3,
            //             },
            //         },
            //     ],
            // };
            // myChart.setOption(option);
            this.handleClick();

            // var prevWidth:any;
            // new ResizeObserver(changes => {
            //     for(const change of changes){
            //         if(change.contentRect.width === prevWidth) return
            //             prevWidth = change.contentRect.width
            //             myChart.resize();
            //     }
            // }).observe( this.main.nativeElement)

            // this.loading = true;




        }, 1000);
    }

    mapData(data: any, selected: any) {
        this.mapDataInfo = this.mapDataInfo.filter((entry2: any) => {
            if (!this.mySelections.includes(entry2.country_id)) {
                return false;
            }
            return true;
        });
        if (selected._selected) {
            this.mapDataInfo.push(data);
        }

        if (this.mapDataInfo.length == 3) {
            this.mapDataInfo.shift();
        }
        if (this.countriesForm.value.length == 3) {
            this.selecte_array.shift();
            this.selecte_array.push(data.country_id);
            this.countriesForm.setValue(this.selecte_array);
            this.mySelections = this.countriesForm.value;
            setTimeout(() => {
                if (this.mySelections.length == 2) {
                    this.country_ids = this.mySelections.toString();
                    this.updateDefaultCountryList(this.country_ids);
                    this.loading = false;
                    this.getComparativeData();
                    localStorage.removeItem('selected_country');
                    localStorage.setItem(
                        'selected_country',
                        this.country_ids
                    );
                    localStorage.removeItem('selected_year_country');
                    localStorage.setItem(
                        'selected_year_country',
                        this.year
                    );
                    this.mySelect.close();
                }
            }, 500);
        } else if (this.countriesForm.value.length == 2) {
            this.selecte_array = this.countriesForm.value;
        }
        this.handleClick();
    }

    mainMap() {
        this._countries.getCountries().subscribe((result) => {
            this.countries = result;
            this.countries_2021 = this.countries[2021];
            this.countries_2022 = this.countries[2022];
            this.countries = [...this.countries_2021, ...this.countries_2022];
            this.countries = [...this.countries_2022];
            var p: any;
            this.countries = [];
            am5.array.each(am5.registry.rootElements, function (root) {
                if (root && root.dom && root.dom.id == 'chartdiv') {
                    root.dispose();
                }
            });
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
            this.polygonSeries = this.chart.series.push(
                am5map.MapPolygonSeries.new(this.root, {
                    geoJSON: am5geodata_worldLow,
                    exclude: ['AQ'],
                })
            );

            //polygonSeries styling
            this.polygonSeries.mapPolygons.template.setAll({
                interactive: true,
                fill: am5.color(0xe6e6e6),
                tooltipText: '{name}',
                templateField: 'polygonSettings',
                strokeWidth: 2,
            });

            // push data in polygonSeries to show country colors using iso_codes
            am5.array.each(this.countries, (c: any) => {
                if (c && c.country_name) {
                    c['name'] = c.country_name;
                }
                let country_iso_codes = [];

                country_iso_codes.push(c.iso_code);

                this.polygonSeries = this.chart.series.push(
                    am5map.MapPolygonSeries.new(this.root, {
                        geoJSON: am5geodata_worldLow,
                        include: country_iso_codes,
                        name: c.name,
                        fill: am5.color(0x84abbd),
                        flag: '/assets/flags/' + c.flag,
                    })
                );
            });

            this.polygonSeries.mapPolygons.template.states.create('active', {
                fill: this.root.interfaceColors.get('primaryButtonActive'),
            });

            this.pointSeries = this.chart.series.push(
                am5map.MapPointSeries.new(this.root, {})
            );

            // Push Bullets with tooltip
            this.pointSeries.bullets.push(() => {
                this.container = am5.Container.new(this.root, {});

                let tooltip: any = am5.Tooltip.new(this.root, {
                    getFillFromSprite: false,
                    paddingBottom: 0,
                    paddingRight: 0,
                    paddingLeft: 0,
                    paddingTop: 0,
                    maxWidth: 200,
                    // showTooltipOn: 'always',
                });

                this.circleProperties = {
                    radius: 3,
                    tooltipY: 0,
                    fill: am5.color(0xff0000),
                    strokeWidth: 0,
                    strokeOpacity: 0,
                    tooltip: tooltip,
                    tooltipHTML: `
              <div style="width:130px;text-align:center; background:#fff; padding:10px; box-shadow: 0px 5px 10px rgba(111, 111, 111, 0.2); border-radius:4px; border-radius:1px;">
              <img src="{flag}" width="20px" height="20px" style="border-radius:50%"><br>
              <span style="color:rgba(0, 0, 0, 0.32);font-size:12px;">{title}</span><div style="text-align:center;width:100%;display: flex;justify-content: center;"></div></div>
            `,
                };

                this.circle = am5.Circle.new(this.root, this.circleProperties);

                this.container.children.push(this.circle);

                this.circle.states.create('hover', {
                    radius: 4,
                    scale: 2,
                    strokeWidth: 3,
                    strokeOpacity: 5,
                    stroke: am5.color(0xff7b7b),
                    // showTooltipOn: 'always',
                });

                return am5.Bullet.new(this.root, {
                    sprite: this.container,
                });
            });

            // Push Data in Pointseries
            let addCountry = (
                longitude: number,
                latitude: number,
                title: string,
                flag: string
            ) => {
                this.pointSeries.data.push({
                    geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    title: title,
                    flag: '/assets/flags/' + flag,
                });
            };

            for (var i = 0; i < this.countries.length; i++) {
                let country = this.countries[i];
                addCountry(
                    country.lng,
                    country.lat,
                    country.name,
                    country.flag
                );
            }
        });
        this.spinner = true;
    }

    getComparativeData() {
        this.comparitive_countries = [];
        this.readiness = [];
        this.availability = [];
        this.capacity_building = [];
        this.development_strategy = [];
        let selected_years = JSON.parse(
            localStorage.getItem('selected_years') || ''
        );
        let selectedYear = this.year;
        if (selected_years && selected_years.length == 2) {
            selectedYear = selected_years.toString();
        }
        let data = {
            countries: this.country_ids,
            developmentId: '1,2',
            year: selectedYear,
        };
        this._common.getComparative(data).subscribe((result) => {
            this.readiness = [];
            this.availability = [];
            this.capacity_building = [];
            this.development_strategy = [];
            result.filter((item: any) => {
                if (!this.comparitive_countries.includes(item.country)) {
                    this.comparitive_countries.push(item.country);
                }

                if (item.development_type == 'Present Development') {
                    if (item.ultimate_field == 'Readiness') {
                        if (item && item.percentage) {

                            if (item.percentage == 0.0) {
                                item.percentage = 0;
                            }

                            if (item.percentage >= 1) {
                                item.percentage = Math.round(item.percentage);
                            }

                            if (item.percentage > 0 && item.percentage < 1) {
                                item.percentage = 1;
                            }
                            this.readiness.push(item);
                        }
                    }

                    if (item.ultimate_field == 'Availability') {
                        if (item && item.percentage) {

                            if (item.percentage == 0.0) {
                                item.percentage = 0;
                            }

                            if (item.percentage >= 1) {
                                item.percentage = Math.round(item.percentage);
                            }

                            if (item.percentage > 0 && item.percentage < 1) {
                                item.percentage = 1;
                            }

                            this.availability.push(item);
                        }
                    }
                } else if (item.development_type == 'Prospective Development') {
                    if (item.ultimate_field == 'Capacity Building') {
                        if (item && item.percentage) {

                            if (item.percentage == 0.0) {
                                item.percentage = 0;
                            }

                            if (item.percentage >= 1) {
                                item.percentage = Math.round(item.percentage);
                            }

                            if (item.percentage > 0 && item.percentage < 1) {
                                item.percentage = 1;
                            }

                            this.capacity_building.push(item);
                        }
                    }

                    if (item.ultimate_field == 'Development Strategy') {
                        if (item && item.percentage) {

                            if (item.percentage == 0.0) {
                                item.percentage = 0;
                            }

                            if (item.percentage >= 1) {
                                item.percentage = Math.round(item.percentage);
                            }

                            if (item.percentage > 0 && item.percentage < 1) {
                                item.percentage = 1;
                            }
                            this.development_strategy.push(item);
                        }
                    }
                }
            });
            this.loading = true;
        });
    }

    handleClick() {
        //his.mapDataInfo.push({iso_code="CL"})
        this._countries.getCountries().subscribe((result) => {
            this.countries = result;
            this.countries_2021 = this.countries[2021];
            this.countries_2022 = this.countries[2022];
            this.countries = [...this.countries_2021, ...this.countries_2022];
            // this.countries = [...this.countries_2022];

            var p: any;
            if (this.mapDataInfo != '') {
                this.countries = this.countries.filter((entry1: any) =>
                    this.mapDataInfo.some(
                        (entry2: any) => entry1.iso_code == entry2.iso_code
                    )
                );
            } else {
                this.countries = this.default_contry_list;
                this.mapDataInfo = this.default_contry_list;
            }
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
            this.polygonSeries = this.chart.series.push(
                am5map.MapPolygonSeries.new(this.root, {
                    geoJSON: am5geodata_worldLow,
                    exclude: ['AQ'],
                })
            );

            //polygonSeries styling
            this.polygonSeries.mapPolygons.template.setAll({
                interactive: true,
                fill: am5.color(0xe6e6e6),
                tooltipText: '{name}',
                templateField: 'polygonSettings',
                strokeWidth: 2,
            });

            // push data in polygonSeries to show country colors using iso_codes
            am5.array.each(this.countries, (c: any) => {
                if (c && c.country_name) {
                    c['name'] = c.country_name;
                }
                let country_iso_codes = [];

                country_iso_codes.push(c.iso_code);

                this.polygonSeries = this.chart.series.push(
                    am5map.MapPolygonSeries.new(this.root, {
                        geoJSON: am5geodata_worldLow,
                        include: country_iso_codes,
                        name: c.name,
                        fill: am5.color(0x84abbd),
                        flag: '/assets/flags/' + c.flag,
                    })
                );
            });

            this.polygonSeries.mapPolygons.template.states.create('active', {
                fill: this.root.interfaceColors.get('primaryButtonActive'),
            });

            this.pointSeries = this.chart.series.push(
                am5map.MapPointSeries.new(this.root, {})
            );

            // Push Bullets with tooltip
            this.pointSeries.bullets.push(() => {
                this.container = am5.Container.new(this.root, {});

                let tooltip: any = am5.Tooltip.new(this.root, {
                    getFillFromSprite: false,
                    paddingBottom: 0,
                    paddingRight: 0,
                    paddingLeft: 0,
                    paddingTop: 0,
                    maxWidth: 200,
                    // showTooltipOn: 'always',
                });

                this.circleProperties = {
                    radius: 3,
                    tooltipY: 0,
                    fill: am5.color(0xff0000),
                    strokeWidth: 0,
                    strokeOpacity: 0,
                    tooltip: tooltip,
                    tooltipHTML: `
                    <div style="width:130px;text-align:center; background:#fff; padding:10px; box-shadow: 0px 5px 10px rgba(111, 111, 111, 0.2); border-radius:4px; border-radius:1px;">
                        <img src="{flag}" width="20px" height="20px" style="border-radius:50%"><br>
                        <span style="color:rgba(0, 0, 0, 0.32);font-size:12px;">{title}</span><div style="text-align:center;width:100%;display: flex;justify-content: center;"></div>
                    </div>
                    `,
                };

                this.circle = am5.Circle.new(this.root, this.circleProperties);

                this.container.children.push(this.circle);

                this.circle.states.create('hover', {
                    radius: 4,
                    scale: 2,
                    strokeWidth: 3,
                    strokeOpacity: 5,
                    stroke: am5.color(0xff7b7b),
                    // showTooltipOn: 'always',
                });

                return am5.Bullet.new(this.root, {
                    sprite: this.container,
                });
            });

            // Push Data in Pointseries
            let addCountry = (
                longitude: number,
                latitude: number,
                title: string,
                flag: string
            ) => {
                this.pointSeries.data.push({
                    geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    title: title,
                    flag: '/assets/flags/' + flag,
                });
            };

            for (var i = 0; i < this.countries.length; i++) {
                let country = this.countries[i];
                addCountry(
                    country.lng,
                    country.lat,
                    country.name,
                    country.flag
                );
            }
        });
    }

    handleCountryChanges(event: any) {
        if (this.countriesForm.value.length < 3) {
            this.mySelections = this.countriesForm.value;
            setTimeout(() => {
                if (this.mySelections.length == 2) {
                    this.country_ids = this.mySelections.toString();
                    this.updateDefaultCountryList(this.country_ids);
                    this.loading = false;
                    this.getComparativeData();
                    localStorage.removeItem('selected_country');
                    localStorage.setItem('selected_country', this.country_ids);
                    localStorage.removeItem('selected_year_country');
                    localStorage.setItem('selected_year_country', this.year);
                    this.mySelect.close();
                }
            }, 500);
        }
    }
    someMethod() {
        this.selected_langth = this.countriesForm.value.length;
    }
}
