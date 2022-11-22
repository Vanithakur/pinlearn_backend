import {
    Component,
    ComponentFactoryResolver,
    ElementRef,
    OnInit,
    ViewChild,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { FormControl } from '@angular/forms';
import { EChartsOption } from 'echarts';
import * as $ from 'jquery';
import data from 'src/assets/data/network.json';
import * as echarts from 'echarts';
import { Location } from '@angular/common';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5 from '@amcharts/amcharts5';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am4plugins_forceDirected from '@amcharts/amcharts4/plugins/forceDirected';

import * as large_tree_data from 'src/assets/data/tree_large';


@Component({
    selector: 'app-comparative-overview',
    templateUrl: './comparative-overview.component.html',
    styleUrls: ['./comparative-overview.component.css'],
})
export class ComparativeOverviewComponent implements OnInit {
    networkData: any = data;
    showBarChart = true;
    chartTitle = 'Bubble Chart';
    chartOptionRadar: any;

    year: any;
    governance: any;
    governance_name: any;
    developmentId: any;
    ultimateId: any;
    ultimate_field: any;
    countries: any;
    taxonomy_id: number = 0;
    taxonomy_name: any;
    taxonomy_overviews: any;
    taxonomy_indicators: any;
    taxonomy_indicators_new: any;
    dash_array: any;
    bar_chart: any;
    bar_chart_new: any;
    radar_chart: any;
    country1: any;
    country2: any;
    range25: any = [];
    range60: any = [];
    range80: any = [];
    range100: any = [];

    isValue: number = 0;
    panelOpenState = false;
    step = 0;
    stepinner = 0;
    showloader: boolean = true;
    loading: boolean = false;
    @ViewChild('main') main: ElementRef | any;

    constructor(
        private location: Location,
        private _common: CommonService,
        private _utilities: UtilitiesService,
        private cdRef: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.dash_array = [1, 2, 3, 4, 5];
        this.ultimateId = environment.default_ultimate_id;
        this.developmentId = environment.default_development_id;
        $(document).ready(function () {
            $('.toggle-tab-button > button').on('click', function () {
                $('.vertical-tab-area').toggleClass('open');
            });
            $('.sub-category li, .parent-li').click(function () {
                $('.sub-category li, .parent-li').removeClass('activelink');
                $(this).addClass('activelink');
                var tagid = $(this).data('tag');
                $('.list').removeClass('active').addClass('hide');
                $('#' + tagid)
                    .addClass('active')
                    .removeClass('hide');
            });
        });
        this._utilities.yearSource.subscribe((message: any) => {
            this.year = message;
            if (localStorage.getItem('selected_country')) {
                this.countries = localStorage.getItem('selected_country');
            } else {
                if (this.year == 2022) {
                    this.countries = environment.default_country_2022;
                } else {
                    this.countries = environment.default_country_2021;
                }
            }
        });

        this._utilities.governanceTypeSource.subscribe((message: any) => {
            this.governance = message;
            if (this.governance == 1) {
                this.taxonomy_id = environment.default_taxonomy_general;
            } else {
                this.taxonomy_id = environment.default_taxonomy_digital;
            }
        });

        this.showBarChart = false;
        this.loading = false;
        this.taxonomyTableDetails();
        this.overviewBarChart();
        this.overviewRadarChart();
        this.overviewBubbleChart();


    }

    taxonomyTableDetails() {
        let selected_years = JSON.parse(localStorage.getItem("selected_years") || '');
        let selectedYear = this.year;
        if (selected_years && selected_years.length == 2) {
            selectedYear = selected_years.toString();
        }

        let data = {
            countries: this.countries,
            developmentId: this.developmentId,
            governanceId: this.governance,
            ultimateId: this.ultimateId,
            taxonomyId: this.taxonomy_id
        };
        this._common.getTaxonomyTabledetails(data).subscribe((result) => {
            this.taxonomy_overviews = result;
            const resultsNew = this.nestGroupsBy(result, ['indicator_name', 'question']);
            let details = Object.entries(resultsNew);
            this.taxonomy_indicators = this.formate_data(details);
        });
    }


    formate_data(data: any) {
        let viewDeatils: any;
        let indicator: any;
        let indicators: any = [];
        let questions: any = [];
        let countries: any = [];
        let indicator_score: any = [];
        let question_order: any;

        indicators = [];
        data.forEach((element: any, index: any) => {
            element.forEach((element1: any, index1: any) => {
                if (index1 == 0) {
                    indicator = element1;
                } else {
                    let question_name: any;
                    let actual_score1 = 0;
                    let actual_score2 = 0;
                    let indicator_score1 = 0;
                    let indicator_score2 = 0;
                    let question_status1: any;
                    let question_status2: any;
                    let country_percantag1 = 0;
                    let country_percantag2 = 0;
                    questions = [];
                    countries = [];
                    indicator_score = [];
                    Object.entries(element1).forEach(function (element2: any, index2: any) {
                        question_name = element2[0];
                        element2[1].forEach(function (element9: any, index9: any) {
                            if (index9 == 0) {
                                question_status1 = element9.status;
                                actual_score1 += element9.actual_score;
                                indicator_score1 = element9.indicator_score;
                                question_order = element9.question_order;
                            } else {
                                actual_score2 += element9.actual_score;
                                question_status2 = element9.status;
                                indicator_score2 = element9.indicator_score;
                                question_order = element9.question_order;
                            }
                            if (!countries.includes(element9.c_name)) {
                                countries.push(element9.c_name);
                            }
                        })
                        let ques = {
                            name: question_name,
                            question_status1: question_status1,
                            question_status2: question_status2,
                            question_order: question_order
                        }
                        questions.push(ques);
                    });

                    country_percantag1 = Math.round(Math.round((actual_score1 / indicator_score1) * 100) / 20);
                    country_percantag2 = Math.round(Math.round((actual_score2 / indicator_score2) * 100) / 20);
                    let score = {
                        country_1: countries[0],
                        country_2: countries[1],
                        indicator_score1: indicator_score1,
                        actual_score1: actual_score1,
                        indicator_score2: indicator_score2,
                        actual_score2: actual_score2,
                        country_percantag1: country_percantag1,
                        country_percantag2: country_percantag2
                    }
                    indicator_score.push(score);
                    indicators.push({
                        name: indicator,
                        questions: questions,
                        countries: countries,
                        score: indicator_score
                    })
                    indicators.sort(function (a: any, b: any) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0); });
                    indicators.map((i: any) => {
                        let obj = i.questions.find((que: any) => que.question_order > 0);

                        if (obj) {
                            return i.questions.sort(function (a: any, b: any) { return (a.question_order > b.question_order) ? 1 : ((b.question_order > a.question_order) ? -1 : 0); });
                        } else {
                            return i.questions.sort(function (a: any, b: any) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0); });
                        }
                    });
                    this.showloader = false
                }
            })
            viewDeatils = { ...viewDeatils, indicators }

        });

        return viewDeatils;
    }

    overviewBarChart() {
        let selected_years = JSON.parse(localStorage.getItem("selected_years") || '');
        let selectedYear = this.year;
        if (selected_years && selected_years.length == 2) {
            selectedYear = selected_years.toString();
        }
        let data = {
            countries: this.countries,
            developmentId: this.developmentId,
            governanceId: this.governance,
            ultimateId: this.ultimateId,
            taxonomyId: this.taxonomy_id
        };

        this._common.getOverviewBarChart(data).subscribe((result) => {
            this.bar_chart = result;
            this.bar_chart_new = [];
            let res0 = Math.round(result[0].percentage);
            let res1 = Math.round(result[1].percentage);
            let bar_data = {
                text: ' ' +  result[0].iso_code  + ':' + res0 + '%,\n',
                comIncome:
                result[1].iso_code  + ': ' + res1 + '%',
                compText: result[0].country_name + ', ' + result[1].country_name,
                img: './assets/images/line.png',
                per: res0,
            };

            if (res0 <= 30 && res1 <= 30) {
                this.bar_chart_new.push(bar_data);
            }
            if (
                res0 > 30 &&
                res0 <= 60 &&
                res1 > 30 &&
                res1 <= 60
            ) {
                this.bar_chart_new.push(bar_data);
            } else if (
                res0 > 60 &&
                res0 <= 80 &&
                res1 > 60 &&
                res1 <= 80
            ) {
                this.bar_chart_new.push(bar_data);
            } else if (
                res0 > 80 &&
                res0 <= 100 &&
                res1 > 80 &&
                res1 <= 100
            ) {
                this.bar_chart_new.push(bar_data);
            }

            this.governance_name = result[0].governance_name;
            this.BarChart();
        });
    }

    overviewRadarChart() {
        let selected_years = JSON.parse(localStorage.getItem("selected_years") || '');
        let selectedYear = this.year;
        if (selected_years && selected_years.length == 2) {
            selectedYear = selected_years.toString();
        }

        let data = {
            countries: this.countries,
            developmentId: environment.default_developments,
            governanceId: this.governance,
            taxonomyId: this.taxonomy_id,
            year: selectedYear,
            ultimateId: ''
        };

        this._common.getOverviewBarChart(data).subscribe((result) => {
            this.radar_chart = result;
            const results = this.nestGroupsBy(result, ['country_name']);
            let resultDetails = Object.values(results);
            this.country1 = this.getCountryDetails(resultDetails[0]);
            this.country2 = this.getCountryDetails(resultDetails[1]);
            this.RadarChart();
        });
    }

    overviewBubbleChart() {

        let self = this;
        let selected_years = JSON.parse(localStorage.getItem("selected_years") || '');
        let selectedYear = this.year;
        if (selected_years && selected_years.length == 2) {
            selectedYear = selected_years.toString();
        }

        let data = {
            developmentId: environment.default_developments,
            governanceId: this.governance,
            ultimateId: this.ultimateId,
            taxonomyId: this.taxonomy_id,
            year: selectedYear,
        };
        this.range25 = [];
        this.range60 = [];
        this.range80 = [];
        this.range100 = [];

        this._common.getOverviewBarChart(data).subscribe((result) => {
            result.forEach((element: any) => {

                let b_chart = {
                    name: element.country_name,
                    iso_code: element.iso_code,
                    value: 2,
                };
                if (element.percentage <= 30) {
                    self.range25.push(b_chart);
                } else if (element.percentage >= 31 && element.percentage <= 60) {
                    self.range60.push(b_chart);
                } else if (element.percentage >= 61 && element.percentage <= 80) {
                    self.range80.push(b_chart);
                } else if (element.percentage >= 80 && element.percentage <= 100) {
                    self.range100.push(b_chart);
                }
            });
            this.BubbleChart();
        });
    }

    dropDown2() {
        $('.toggleSubmenu2').next('ul').toggleClass('show');
    }
    dropDown1() {
        $('.toggleSubmenu1').next('ul').toggleClass('show');
    }

    setStep(index: number) {
        this.step = 0;
        return true;
    }

    setStepInner(index: number) {
        this.stepinner = index;
    }

    toggle(num: number) {
        this.isValue = num;
    }

    ngAfterViewInit(): void {
        //this.RadarChart();
        this.NetworkChart();
        this.ToggleChart();
        this.cdRef.detectChanges();
    }

    RadarChart() {
        this.chartOptionRadar = {
            color: ['#05D5AA', '#5200FF', '#56A3F1', '#FF917C'],
            title: {
                text: this.taxonomy_name,
            },
            legend: {
                top: 'top',
                left: 'right',
                orient: 'vertical'
            },
            tooltip: {
                'show': true,
            },
            radar: [
                {
                    indicator: [
                        { text: 'Availability', max: 100 },
                        { text: 'Capacity Building', max: 100 },
                        { text: 'Development Strategy', max: 100 },
                        { text: 'Readiness', max: 100 },
                    ],
                    center: ['55%', '55%'],
                    radius: window.innerWidth <= 1300 ? 90 : 118,
                    startAngle: 90,
                    splitNumber: 4,
                    shape: 'circle',
                    axisName: {
                        color: '#707070',
                        fontSize: '10',
                    },
                    splitArea: {
                        areaStyle: {
                            color: ['#E3E3E3', '#F2F2F2', '#E3E3E3', '#F2F2F2'],
                            shadowColor: 'rgba(0, 0, 0, 0.2)',
                            shadowBlur: 10,
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(154,165,162,1)',
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(154,165,162,1)',
                        },
                    },
                },
            ],
            series: [
                {
                    type: 'radar',
                    emphasis: {
                        lineStyle: {
                            width: 4,
                        },
                    },
                    data: [
                        {
                            value: [
                                this.country1.a_score,
                                this.country1.c_score,
                                this.country1.d_score,
                                this.country1.r_score,
                            ],
                            name: this.country1.country,
                            areaStyle: {
                                color: '#05d5aa4d',
                            },
                        },
                        {
                            value: [
                                this.country2.a_score,
                                this.country2.c_score,
                                this.country2.d_score,
                                this.country2.r_score,
                            ],
                            name: this.country2.country,
                            areaStyle: {
                                color: '#5200ff6b',
                            },
                        },
                    ],
                },
            ],
        };
    }

    // NetworkChart() {
    //     let chartDom = this.main.nativeElement;
    //     let myChart = echarts.init(chartDom);
    //     let option: any;

    //     this.networkData.nodes.forEach(function (node: any) {
    //         node.label = {
    //             show: node.symbolSize > 30,
    //         };
    //     });
    //     option = {
    //         title: {
    //             text: '',
    //             subtext: '',
    //             top: 'bottom',
    //             left: 'right',
    //         },
    //         tooltip: {
    //             trigger: "item",
    //             formatter: function (params: any) {
    //                 if(params.data.name) {
    //                     return params.name
    //                 }
    //                 return;
    //             }
    //         },
    //         legend: [
    //             {
    //                 // selectedMode: 'single',
    //                 data: this.networkData.categories.map(function (a: {
    //                     name: string;
    //                 }) {
    //                     return a.name;
    //                 }),
    //             },
    //         ],
    //         series: [
    //             {
    //                 name: '',
    //                 type: 'graph',
    //                 layout: 'none',
    //                 data: this.networkData.nodes,
    //                 links: this.networkData.links,
    //                 categories: this.networkData.categories,
    //                 roam: true,
    //                 label: {
    //                     color: '#fff',
    //                     position: 'inside',
    //                     align: 'center',
    //                     formatter: '{b}',
    //                     verticalAlign: 'middle',
    //                     fontSize: '9',
    //                     fontWeight : 'bolder',
    //                 },
    //                 // label: {
    //                 //   color: '#fff',
    //                 //   fontSize: '80',
    //                 //   position: 'center',
    //                 // },
    //                 lineStyle: {
    //                     color: 'source',
    //                     curveness: 0.3,
    //                 },
    //             },
    //         ],
    //     };
    //     myChart.setOption(option);

    //     myChart.on('click', (params) => {
    //         if (params.borderColor == undefined) {
    //             let test = JSON.stringify(params.data);
    //             let d_info = JSON.parse(test);
    //             this.developmentId = d_info.d_id;
    //             this.governance = d_info.g_id;
    //             this.ultimateId = d_info.u_id;
    //             this.taxonomy_id = d_info.t_id;
    //             this.loading = false;
    //             this.taxonomyTableDetails();
    //             this.overviewRadarChart();
    //             this.overviewBarChart();
    //             this.overviewBubbleChart();
    //         }
    //     });
    // }

    NetworkChart() {

        am4core.useTheme(am4themes_animated);

        var chart = am4core.create("Treechart0", am4plugins_forceDirected.ForceDirectedTree);
        if (chart.logo) {
            chart.logo.disabled = true;
        }
        var series = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());

        series.data = large_tree_data.default;

        // chart.legend = new am4charts.Legend();

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
        series.nodes.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;

        series.nodes.template.label.text = "{text}"
        series.fontSize = 7;
        series.maxLevels = 4;
        series.nodes.template.label.hideOversized = true;
        series.nodes.template.label.truncate = true;

        series.nodes.template.strokeWidth = 6;
        series.links.template.strokeOpacity = 1;
        series.nodes.template.outerCircle.strokeOpacity = 1;
        series.nodes.template.outerCircle.fillOpacity = 1;
        series.nodes.template.togglable = false;
        series.minRadius = 1;

        series.nodes.template.events.on('ready', function (event:any) {
            if(event.target.dataItem.dataContext) {
                var fontSize:any = event.target.dataItem.dataContext.sizeFont;
            }
            event.target.fontSize = fontSize;
        });
        
        
        // series.maxRadius = 35;
        series.nodes.template.events.on("hit", (e: any) => {
            let test = JSON.stringify(e.target.dataItem.dataContext);
            let d_info = JSON.parse(test);
            this.developmentId = d_info.d_id;
            this.governance = d_info.g_id;
            this.ultimateId = d_info.u_id;
            this.taxonomy_id = d_info.t_id;
            this.loading = false;
            this.taxonomyTableDetails();
            this.overviewRadarChart();
            this.overviewBarChart();
            this.overviewBubbleChart();
        })
    }

    BubbleChart() {
        am4core.useTheme(am4themes_animated);

        var chart = am4core.create(
            'chartdiv1',
            am4plugins_forceDirected.ForceDirectedTree
        );
        if (chart.logo) {
            chart.logo.disabled = true;
        }

        chart.legend = new am4charts.Legend();
        chart.legend.maxHeight = 50;
        chart.legend.fontSize = 8;
        var markerTemplate = chart.legend.markers.template;
        markerTemplate.width = 10;
        markerTemplate.height = 10;
        chart.legend.scrollable = true;
        var networkSeries = chart.series.push(
            new am4plugins_forceDirected.ForceDirectedSeries()
        );

        networkSeries.data = [];
        networkSeries.data = [
            {
                id: '1',
                name: '0%-30%',
                iso_code: '30%',
                value: 2,
                fixed: true,
                color: '#FA8E15',
                x: am4core.percent(40),
                y: am4core.percent(40),
                children: this.range25,
            },
            {
                id: '2',
                name: '81%-100%',
                iso_code: '100%',
                color: '#220055',
                fixed: true,
                value: 2,
                x: am4core.percent(50),
                y: am4core.percent(25),
                children: this.range100,
            },
            {
                id: '3',
                name: '61%-80%',
                iso_code: '80%',
                color: '#3678B5',
                fixed: true,
                value: 2,
                x: am4core.percent(50),
                y: am4core.percent(50),
                children: this.range80,
            },
            {
                id: '4',
                name: '31%-60%',
                iso_code: '60%',
                color: '#5FE7B1',
                fixed: true,
                value: 2,
                x: am4core.percent(60),
                y: am4core.percent(40),
                children: this.range60,
            },
        ];

        networkSeries.dataFields.linkWith = 'linkWith';
        networkSeries.dataFields.name = 'name';
        networkSeries.dataFields.id = 'id';
        networkSeries.dataFields.value = 'value';
        networkSeries.dataFields.children = 'children';
        networkSeries.dataFields.fixed = 'fixed';
        networkSeries.dataFields.color = 'color';

        // networkSeries.nodes.template.width = 100;

        networkSeries.nodes.template.propertyFields.x = 'x';
        networkSeries.nodes.template.propertyFields.y = 'y';

        networkSeries.nodes.template.tooltipText = '{name}';
        networkSeries.nodes.template.fillOpacity = 1;

        networkSeries.nodes.template.label.text = '{iso_code}';
        networkSeries.fontSize = 8;
        // networkSeries.maxLevels = 3;
        networkSeries.nodes.template.label.hideOversized = true;
        networkSeries.nodes.template.label.truncate = true;
        networkSeries.links.template.distance = 0;
        networkSeries.links.template.disabled = true;
        // networkSeries.nodes.template.interactionsEnabled = false;

        networkSeries.nodes.template.strokeWidth = 0;
        networkSeries.links.template.strokeOpacity = 0;
        networkSeries.nodes.template.label.fill = am4core.color('#fff');

        networkSeries.nodes.template.outerCircle.strokeOpacity = 0;
        networkSeries.nodes.template.outerCircle.fillOpacity = 0;
        networkSeries.nodes.template.togglable = false;

        networkSeries.minRadius = 5;
        networkSeries.maxRadius = 10;
        var title2 = chart.titles.create();
        const mac = navigator.appVersion.indexOf("Mac") != -1 ? '62%' : '38%'
        title2.html =
            `<div style="background: #000;
        color: #fff;
        width: 50px;
        height: 200px;
        padding: 10px;
        text-align: center;
        border-radius: 15px 0px 0 15px;">
        <div style="transform: rotate(-90deg);
        position: absolute;
        left: -50px;
        top: `+ mac + `;">
        <label style="font-size: 12px;
        width: 150px;
        position: relative;
        top: 48%;
        height: 100%;
    display: inherit;">` +
            this.bar_chart[0].development_type +
            `</label>
        <span style="font-size: 12px;"><b>` +
            this.bar_chart[0].ultimate_field +
            `</b><span>
        <div>
        </div>`;
        title2.align = 'left';
        title2.rotation = 0;
        title2.marginBottom = -180;

        var title = chart.titles.create();
        title.text = this.bar_chart[0].taxonomy_name;
        title.marginTop = 0;
        title.marginBottom = 30;
        title.marginLeft = 60;
        title.fontSize = 15;
        title.fontWeight = '300';
        title.align = 'center';
    }

    // BarChart() {
    //     if (this.bar_chart) {
    //         //let root:any;
    //         am5.array.each(am5.registry.rootElements, function (root) {
    //             if (root && root.dom && root.dom.id == 'chartdiv2') {
    //                 root.dispose();
    //             }
    //         });
    //         let root:any = am5.Root.new('chartdiv2');

    //         root._logo.dispose();

    //         // Set themes
    //         // https://www.amcharts.com/docs/v5/concepts/themes/
    //         root.setThemes([am5themes_Animated.new(root)]);

    //         // Create chart
    //         // https://www.amcharts.com/docs/v5/charts/xy-chart/
    //         let chart: any = root.container.children.push(
    //             am5xy.XYChart.new(root, {
    //                 panX: false,
    //                 panY: false,
    //                 wheelX: 'none',
    //                 wheelY: 'none',
    //             })
    //         );

    //         let data = [
    //             {
    //                 year: '1',
    //                 income: 100,
    //                 columnConfig: {
    //                     fill: am5.color(0x220055),
    //                 },
    //             },
    //             {
    //                 year: '2',
    //                 income: 80,
    //                 columnConfig: {
    //                     fill: am5.color(0x3678B5),
    //                 },
    //             },
    //             {
    //                 year: '3',
    //                 income: 60,
    //                 columnConfig: {
    //                     fill: am5.color(0x5FE7B1),
    //                 },
    //             },
    //             {
    //                 year: '4',
    //                 income: 30,
    //                 columnConfig: {
    //                     fill: am5.color(0xfa8e15),
    //                 },
    //             },
    //         ];
    //         if (this.bar_chart_new.length == 1) {
    //             this.bar_chart_new.forEach((element: any) => {
    //                 let bar_data_same = {
    //                     text: element.text,
    //                     comIncome: element.comIncome,
    //                     compText: element.compText,
    //                     img: './assets/images/line.png',
    //                 };
    //                 if (element.per <= 30) {
    //                     data[3] = { ...data[3], ...bar_data_same };
    //                 } else if (element.per >= 31 && element.per <= 60) {
    //                     data[2] = { ...data[2], ...bar_data_same };
    //                 } else if (element.per >= 61 && element.per <= 80) {
    //                     data[1] = { ...data[1], ...bar_data_same };
    //                 } else if (element.per >= 81 && element.per <= 100) {
    //                     data[0] = { ...data[0], ...bar_data_same };
    //                 }
    //             });
    //         } else {
    //             this.bar_chart.forEach((element: any) => {
    //                 let bar_data = {
    //                     text: element.country_name,
    //                     comIncome: Math.round(element.percentage) + '%',
    //                     compText: element.country_name,
    //                     img: './assets/images/line.png',
    //                 };
    //                 if (element.percentage <= 30) {
    //                     data[3] = { ...data[3], ...bar_data };
    //                 } else if (element.percentage >= 31 && element.percentage <= 60) {
    //                     data[2] = { ...data[2], ...bar_data };
    //                 } else if (element.percentage >= 61 && element.percentage <= 80) {
    //                     data[1] = { ...data[1], ...bar_data };
    //                 } else if (element.percentage >= 81 && element.percentage <= 100) {
    //                     data[0] = { ...data[0], ...bar_data };
    //                 }
    //             });
    //         }

    //         // Create axes
    //         // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    //         let yAxis = chart.yAxes.push(
    //             am5xy.CategoryAxis.new(root, {
    //                 categoryField: 'year',
    //                 renderer: am5xy.AxisRendererY.new(root, {
    //                     cellStartLocation: 0.2,
    //                     cellEndLocation: 0.9,
    //                     strokeOpacity: 1,
    //                     strokeWidth: 1,
    //                 }),
    //             })
    //         );

    //         const myTheme = am5.Theme.new(root);

    //         myTheme.rule('Grid').setAll({
    //             visible: false,
    //         });

    //         root.setThemes([myTheme]);

    //         let yRenderer = yAxis.get('renderer');
    //         yRenderer.labels.template.setAll({
    //             visible: false,
    //         });

    //         yAxis.data.setAll(data);
    //         var xAxis;

    //         xAxis = chart.xAxes.push(
    //             am5xy.ValueAxis.new(root, {
    //                 min: 0,
    //                 numberFormat: "''",
    //                 renderer: am5xy.AxisRendererX.new(root, {
    //                     strokeOpacity: 1,
    //                     strokeWidth: 1,
    //                     minGridDistance: 20
    //                 }),
    //             })
    //         );

    //         let myRange = [
    //             {
    //                 x: 20,
    //             },
    //             {
    //                 x: 40,
    //             },
    //             {
    //                 x: 60,
    //             },
    //             {
    //                 x: 80,
    //             },
    //             {
    //                 x: 100,
    //             },
    //         ];

    //         for (var i = 0; i < data.length + 1; i++) {
    //             let value = myRange[i].x;

    //             let rangeDataItem = xAxis.makeDataItem({
    //                 value: value,
    //             });

    //             let range = xAxis.createAxisRange(rangeDataItem);

    //             rangeDataItem.get('label').setAll({
    //                 forceHidden: false,
    //                 text: value + '%',
    //             });
    //         }

    //         yAxis.children.moveValue(
    //             am5.Label.new(root, {
    //                 html:
    //                     `
    //                 <div style="background: #000;
    //                     color: #fff;
    //                     width: 50px;
    //                     height: 200px;
    //                     padding: 10px;
    //                     text-align: center;
    //                     border-radius: 15px 0px 0 15px;">
    //                     <div style="transform: rotate(-90deg);
    //                     position: absolute;
    //                     left: -50px;
    //                     top: 38%;">
    //                     <label style="font-size: 12px;
    //                     width: 150px;
    //                     position: relative;
    //                     top: 48%;">` +
    //                     this.bar_chart[0].development_type +
    //                     `</label>
    //                 <span style="font-size: 12px;"><b>` +
    //                     this.bar_chart[0].ultimate_field +
    //                     `</b><span>
    //                 <div>
    //                 </div>
    //                 `,
    //             }),
    //             0
    //         );

    //         // Add series
    //         // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    //         let series1 = chart.series.push(
    //             am5xy.ColumnSeries.new(root, {
    //                 name: 'income',
    //                 xAxis: xAxis,
    //                 yAxis: yAxis,
    //                 valueXField: 'income',
    //                 categoryYField: 'year',
    //                 sequencedInterpolation: true,
    //             })
    //         );

    //         series1.columns.template.setAll({
    //             height: am5.percent(70),
    //             templateField: 'columnConfig',
    //             strokeOpacity: 0,
    //         });

    //         series1.bullets.push(function () {
    //             let fontsize = window.innerWidth <= 1400 ? '10px' : '14px';
    //             return am5.Bullet.new(root, {
    //                 locationX: 0.8,
    //                 locationY: -0.5,
    //                 sprite: am5.Label.new(root, {
    //                     centerY: am5.p50,
    //                     html: `<div style="text-align:center; font-size:`+ fontsize +`">
    //                   {comIncome} <br> {compText}<br>
    //                   <img src="{img}" width="100" style="margin-top:-17px;margin-left:-17px;">
    //             </div>`,
    //                 }),
    //             });
    //         });

    //         // Add cursor
    //         // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    //         let cursor = chart.set(
    //             'cursor',
    //             am5xy.XYCursor.new(root, {
    //                 behavior: 'none',
    //             })
    //         );
    //         cursor.lineX.set('visible', false);
    //         cursor.lineY.set('visible', false);

    //         series1.data.setAll(data);

    //         // Make stuff animate on load
    //         // https://www.amcharts.com/docs/v5/concepts/animations/
    //         series1.appear();
    //         chart.appear(1000, 100);

    //         // chart.children.unshift(
    //         //     am5.Label.new(root, {
    //         //         html: this.bar_chart[0].taxonomy_name,
    //         //         fontSize: 15,
    //         //         fontWeight: '500',
    //         //         textAlign: 'left',
    //         //         x: am5.percent(25),
    //         //         y: -19,

    //         //         // centerX: am5.percent(90),
    //         //         // paddingTop: -20,
    //         //         // paddingBottom: 10,
    //         //         // paddingRight: 65,
    //         //     })
    //         // );
    //     }
    //     this.loading = true;
    // }

    BarChart() {
        if (this.bar_chart) {
            var chartDom: any = document.getElementById('mainchart56');
            var myChart = echarts.init(chartDom);
            var option;

            let data: any = [
                {
                    name: '81%-100%',
                    lname: '81%-100%',
                    tooltipName: '',
                    value: 100,
                    labelLine: { show: false },
                    label: { show: false },
                    emphasis: { label: { show: false } },
                    tooltip: { show: false },
                    itemStyle: {
                        borderRadius: 5,
                        color: "#220055",
                    }
                },
                {
                    name: '61%-80%',
                    lname: '61%-80%',
                    tooltipName: '',
                    value: 80,
                    labelLine: { show: false },
                    label: { show: false },
                    emphasis: { label: { show: false } },
                    tooltip: { show: false },
                    itemStyle: {
                        borderRadius: 5,
                        color: "#3678B5",
                    }
                },
                {
                    name: '31%-60%',
                    lname: '31%-60%',
                    tooltipName: '',
                    value: 60,
                    labelLine: { show: false },
                    label: { show: false },
                    emphasis: { label: { show: false } },
                    tooltip: { show: false },
                    itemStyle: {
                        borderRadius: 5,
                        color: "#5FE7B1",
                    }
                },
                {
                    name: '0%-30%',
                    lname: '0%-30%',
                    value: 30,
                    labelLine: { show: false },
                    label: { show: false },
                    emphasis: {
                        label: { show: false }
                    },
                    tooltip: { show: false },
                    itemStyle: {
                        borderRadius: 5,
                        color: "#fa8e15",
                    }
                },
            ];

            if (this.bar_chart_new.length == 1) {
                this.bar_chart_new.forEach((element: any) => {
                    let bar_data_same = {
                        name: element.text + " " + element.comIncome,
                        tooltipName: element.text + " " + element.comIncome,
                        labelLine: { show: true },
                        label: { show: true },
                        tooltip: { show: true },
                        emphasis: { label: { show: true } },
                    };
                    if (element.per <= 30) {
                        data[3] = { ...data[3], ...bar_data_same };
                    } else if (element.per >= 31 && element.per <= 60) {
                        data[2] = { ...data[2], ...bar_data_same };
                    } else if (element.per >= 61 && element.per <= 80) {
                        data[1] = { ...data[1], ...bar_data_same };
                    } else if (element.per >= 81 && element.per <= 100) {
                        data[0] = { ...data[0], ...bar_data_same };
                    }
                });
            } else {
                this.bar_chart.forEach((element: any) => {
                    let bar_data = {
                        name: (element.country_name.length > 9 ? element.iso_code : element.country_name) + ':' + Math.round(element.percentage) + '%',
                        tooltipName: element.country_name + ':' + Math.round(element.percentage) + '%',
                        labelLine: { show: true },
                        label: {
                            show: true
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        },
                        tooltip: {
                            show: true
                        },
                    };
                    if (element.percentage <= 30) {
                        data[3] = { ...data[3], ...bar_data };
                    } else if (element.percentage >= 31 && element.percentage <= 60) {
                        data[2] = { ...data[2], ...bar_data };
                    } else if (element.percentage >= 61 && element.percentage <= 80) {
                        data[1] = { ...data[1], ...bar_data };
                    } else if (element.percentage >= 81 && element.percentage <= 100) {
                        data[0] = { ...data[0], ...bar_data };
                    }
                });
            }

            option = {
                legend: {
                    bottom: -5,
                    left: 'center',
                    icon: 'circle',
                    show: data ? true : false,
                    formatter: data ? (name: any) => {
                        let itemValue = data.filter((item: any) => item.name === name)
                        return `${itemValue[0].lname}`
                    } : "{lname}",
                },
                tooltip: {
                    trigger: 'item',
                    formatter: data ? (name: any) => {
                        let itemValue = data.filter((item: any) => item.name === name)
                        if (name.data.tooltipName) {
                            return `${name.data.tooltipName}`;
                        }
                        return false;
                    } : "{name}",
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: [20, 110],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        avoidLabelOverlap: true,
                        data: data.reverse()
                    }
                ]
            };

            option && myChart.setOption(option);

            // rezise when sidebar collapse
            var prevWidth:any;
            new ResizeObserver(changes => {
                for(const change of changes){
                    if(change.contentRect.width === prevWidth) return
                        prevWidth = change.contentRect.width
                        myChart.resize();
                }
            }).observe(chartDom)
            
        }
        this.loading = true;
    }

    ToggleChart() {
        this.showBarChart = !this.showBarChart;
        if (this.showBarChart) {
            this.chartTitle = 'Bubble Chart';
            // this.BarChart();
        } else {
            this.chartTitle = 'Bar Chart';
            this.BubbleChart();
        }
    }

    previousPage() {
        this.location.back();
    }

    getCountryDetails(data: any) {
        let availability_score: any;
        let radiness_score: any;
        let capacity_score: any;
        let development_score: any;
        let country: any;
        data.forEach((element: any) => {
            country = element.country_name;
            if (element.ultimate_field == 'Readiness') {
                radiness_score = element.percentage;
            } else if (element.ultimate_field == 'Availability') {
                availability_score = element.percentage;
            } else if (element.ultimate_field == 'Capacity Building') {
                capacity_score = element.percentage;
            } else if (element.ultimate_field == 'Development Strategy') {
                development_score = element.percentage;
            }
        });
        let result = {
            r_score: radiness_score,
            a_score: availability_score,
            c_score: capacity_score,
            d_score: development_score,
            country: country,
        };
        return result;
    }

    groupBy(conversions: any, property: any) {
        return conversions.reduce((acc: any, obj: any) => {
            let key = obj[property];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {});
    }

    nestGroupsBy(arr: any, properties: any) {
        properties = Array.from(properties);
        if (properties.length === 1) {
            return this.groupBy(arr, properties[0]);
        }
        const property = properties.shift();
        var grouped = this.groupBy(arr, property);
        for (let key in grouped) {
            grouped[key] = this.nestGroupsBy(
                grouped[key],
                Array.from(properties)
            );
        }
        return grouped;
    }
}
