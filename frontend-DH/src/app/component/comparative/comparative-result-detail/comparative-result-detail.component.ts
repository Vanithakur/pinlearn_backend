import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormControl } from '@angular/forms';
import { EChartsOption } from 'echarts';
import * as $ from 'jquery';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
    selector: 'app-comparative-result-detail',
    templateUrl: './comparative-result-detail.component.html',
    styleUrls: ['./comparative-result-detail.component.css'],
})
export class ComparativeResultDetailComponent implements OnInit, OnDestroy {
    countriesForm = new FormControl();
    step = 0;
    stepinner = 0;
    comparative_tables : any;
    comparitive_countries: any = [];
    ultimate_type:any;
    present_details:any=[];
    prospective_details:any=[];
    availability_details:any=[];
    readiness_details:any=[];
    capacity_building:any=[];
    development_strategy:any=[];
    taxonomy_name:any;
    development_name:any;
    entries:any;
    year:any;
    governance:any;
    developmentId:any;
    ultimateId:any;
    country_list:any;
    ultimate_field:any;
    taxonomy_id:number = 0;
    dash_array:any;
    mySelections: any=[];
    countries:any;
    triggerInit: boolean = true;
    showToolTip: any;
    showCompressedText: boolean = true;
    showToolTipCountry:any;
    showToolTipTable:any;
    setStep(index: number) {
        this.step = index;
    }

    setStepInner(index: number) {
        this.stepinner = index;
    }

    selected_langth = 2;
    BarChartOptions: any;
    default_contry_list:any;
    showloader:boolean = true;

    selecte_array: any=[];
    @ViewChild('mySelect') mySelect: ElementRef | any;

    constructor(private location: Location, private _common: CommonService,private _utilities: UtilitiesService, ) {}
    ngOnInit() {

        if(localStorage.getItem('toolTipCountry') != null ){
            this.showToolTipCountry = JSON.parse(localStorage.getItem('toolTipCountry') || '');
        }

        if(localStorage.getItem('toolTipTable') != null ){
            this.showToolTipTable = JSON.parse(localStorage.getItem('toolTipTable') || '');
        }

        this._utilities.showHeaderMenu.next(true);
        this._utilities.sideMenu.subscribe((result: any )=> {
            this.showCompressedText = result;
        });
        this.ultimateId = this.ultimateId ? this.ultimateId :  environment.default_ultimate_id;
        this.developmentId =  this.developmentId?  this.developmentId : environment.default_development_id;

        this._utilities.governanceTypeSource.subscribe((governanceId) => {
            this.governance = governanceId;
            this.step = 0;
            if (this.triggerInit) {
                let self = this;
                this.dash_array = [1,2,3,4,5];


                let selectedYear = JSON.parse(localStorage.getItem("selected_years") || '');

                if(Array.isArray(selectedYear)){
                    this.year = selectedYear && selectedYear[0] ? selectedYear[0] : this.year;
                }else{
                    this.year = selectedYear;
                }

                if(localStorage.getItem("selected_country")){
                    this.countries = localStorage.getItem("selected_country");
                }else{
                    if(this.year == 2022){
                        this.countries = environment.default_country_2022;
                    }else{
                        this.countries =  environment.default_country_2021;
                    }
                }

                // this._utilities.governanceTypeSource.subscribe((message: any) => {
                //     this.governance = message;
                // })

                let data = {
                    year:this.year
                };

                this._common.getExistedCountries(data).subscribe((result) => {
                    this.country_list = result;
                })

                let default_contry = {
                    countries:this.countries,
                    year:this.year
                }

                this._common.getdefaultCountry(default_contry).subscribe((result) => {
                    this.default_contry_list = result;
                    let selectedOption:any= [];
                    self.mySelections = [];
                    result.forEach(function (element: any, index: any) {
                        selectedOption.push(element.country_id)
                        self.mySelections.push(element.country_id);

                    })
                    this.countriesForm.setValue(selectedOption);
                    this.selecte_array = this.countriesForm.value;
                })

                this.comparativeOverviewDetails();
                this.comparativeInformationChart();
                this.topcountriesChart();
            }
        });

        $(document).ready(function () {
            $('.vertical-tab-area').toggleClass('open');
            $('.main-li li:first').addClass('active');
            $('.main-li ul li:first').addClass('activelink');
            $('.toggle-tab-button > button').on('click', function () {
                $('.vertical-tab-area').toggleClass('open');
            });
            $('.sub-category li, .parent-li').click(function () {
                $('.sub-category li, .parent-li').removeClass('activelink');
                $(this).addClass('activelink');
                var tagid = $(this).data('tag');
                $('.list').removeClass('active').addClass('hide');
                $('#' + tagid).addClass('active').removeClass('hide');
            });
        });

    }

    toggleProspective(event:any){
        setTimeout(() => {
            $('#present_development li:first').removeClass('active');
            $('#present_development ul li:first').removeClass('activelink');
            $('#prospective_development li:first').addClass('active');
            $('#prospective_development ul li:first').addClass('activelink');
            this.ultimateSelection(2,4);
        }, 100);

    }

    togglePresent(event:any){
        setTimeout(() => {
            $('#prospective_development li:first').removeClass('active');
            $('#prospective_development ul li:first').removeClass('activelink');
            $('#present_development li:first').addClass('active');
            $('#present_development ul li:first').addClass('activelink');
            this.ultimateSelection(1,2);
        }, 100);

    }

    dropDown2() {
        $('.toggleSubmenu2').next('ul').toggleClass('show');
    }

    dropDown1() {
        $('.toggleSubmenu1').next('ul').toggleClass('show');
    }

    // isValue: number = 0;

    // toggle(num: number) {
    //     this.isValue = num;
    // }

    handlePrint() {
        window.print();
    }

    previousPage() {
        this.location.back();
    }

    ultimateSelection(development_id:number,ultimate_id:number){
        this.developmentId = development_id;
        this.ultimateId = ultimate_id;
        this.comparativeInformationChart();
    }

    topCityChart(taxonomy_id:number){
        this.taxonomy_id = taxonomy_id;
        this.topcountriesChart();
    }

    comparativeOverviewDetails(){
        this.showloader = true;
        this.present_details = [];
        this.prospective_details = [];
        let selected_years = JSON.parse(localStorage.getItem("selected_years") || '');
        let selectedYear = this.year;
        if(selected_years && selected_years.length == 2){
            selectedYear = selected_years.toString();
        }
        let data = {
            countries: this.countries,
            governanceId:this.governance
        };
        this._common.getComparativeOverview(data).subscribe((result) => {
            // this.entries = Object.entries(result);
            let sortedData = Object.keys(result).sort().reduce((accumulator:any, key:any) => {
                accumulator[key] = result[key];
                return accumulator;
            }, {});

            this.entries = Object.entries(sortedData);
            let present_detail =  this.formate_data(this.entries[0]);
            let prospective_detail = this.formate_data(this.entries[1]);
            this.present_details.push(present_detail);
            this.prospective_details.push(prospective_detail);
            this.availability_details = this.present_details[0].ultimates[0].taxonomy;
            this.readiness_details = this.present_details[0].ultimates[1].taxonomy;
            this.capacity_building = this.prospective_details[0].ultimates[0].taxonomy;
            this.development_strategy = this.prospective_details[0].ultimates[1].taxonomy;
            this.showloader = false;
        });
    }

    comparativeInformationChart(){
        let selected_years = JSON.parse(localStorage.getItem("selected_years") || '');
        let selectedYear = this.year;
        if(selected_years && selected_years.length == 2){
            selectedYear = selected_years.toString();
        }

        let data = {
            countries: this.countries,
            developmentId:this.developmentId,
            ultimateId:this.ultimateId,
            governanceId:this.governance
        };
        this.comparitive_countries = [];
        this._common.getComparativeInformation(data).subscribe((result) => {
            result.sort(function(a:any,b:any) {return (a.taxonomy > b.taxonomy) ? 1 : ((b.taxonomy > a.taxonomy) ? -1 : 0);} );
            this.comparative_tables = result;

            this.comparative_tables.map((item_ct:any) => {
                if(item_ct.percentage == 0.0) {
                    item_ct.percentage = 0;
                }

                if (item_ct.percentage >= 1) {
                    item_ct.percentage = Math.round(item_ct.percentage);
                }

                if (item_ct.percentage > 0 && item_ct.percentage < 1) {
                    item_ct.percentage = 1;
                }
            })


            this.development_name = result[0].development_type;
            result.filter((item: any, index:any ) => {
                this.ultimate_type = item.ultimate_field;
                if (index == 0 ){
                    if((this.governance == 1)) {
                        this.taxonomy_id = this.step == 0 ? environment.default_taxonomy_general: this.taxonomy_id;
                    }
                    if((this.governance == 2)) {
                        this.taxonomy_id = this.step == 0 ? environment.default_taxonomy_digital: this.taxonomy_id;
                    }
                    this.topcountriesChart();
                }
                if (!this.comparitive_countries.includes(item.country)) {
                    this.comparitive_countries.push(item.country);
                }
            })
        });
    }

    topcountriesChart(){
        let taxonomy:any;
        if(this.taxonomy_id == 0){
            taxonomy = (this.governance == 1)? environment.default_taxonomy_general:environment.default_taxonomy_digital;
        }else{
            taxonomy = this.taxonomy_id;
        }

        let selected_years = JSON.parse(localStorage.getItem("selected_years") || '');
        let selectedYear = this.year;
        if(selected_years && selected_years.length == 2){
            selectedYear = selected_years.toString();
        }

        let data = {
            taxonomyId:taxonomy,
            developmentId:this.developmentId,
            ultimateId:this.ultimateId,
            governanceId:this.governance,
            year:selectedYear
        };
        let self = this;
        this._common.getTopCountriesData(data).subscribe((result) => {
            let taxonomy_name:any;
            let source:any = [];
            let re_aaray :any = [];
            result.forEach(function (element: any, index: any) {
                self.ultimate_field = element.ultimate_field;
                taxonomy_name = element.taxonomy_name;
                if (index == 0 ){
                    re_aaray.push( 'label', element.ultimate_field);
                    source.push(re_aaray)
                    re_aaray = [];
                }
                re_aaray.push( element.country_name, element.score);
                source.push(re_aaray)
                re_aaray = [];
            });

            let option = {
                title: {
                    text: taxonomy_name,
                    textStyle: {
                        fontSize: 12
                    }
                },
                // legend: {
                //     orient: 'vertical',
                //     right: 0,
                //     top: 15,
                //     textStyle: {
                //         fontSize: 11
                //     }
                // },
                tooltip: {},
                dataset: {
                    source: source,
                },
                xAxis: {
                    type: "category",
                    axisLabel: {
                      interval: 0,
                      rotate: 30,
                      textStyle: {
                        fontSize: 10
                    }
                    },
                    // axisLabel: {
                    //     width: 100, //fixed number of pixels
                    //     overflow: 'truncate', // or 'break' to continue in a new line
                    //     interval: 0,
                    //   },
                },
                yAxis: {},
                // series: [{ type: 'bar' }],
                series: [
                    {
                      type: 'bar',
                      itemStyle: {
                        borderRadius : [6, 6, 0, 0], // Specify the border radius
                        color: '#5200FF'
                      },
                    },
                  ],
                grid: {
                    left: '1%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
            };
            this.BarChartOptions = option;
        });
    }

    formate_data(data:any){
        let devData:any;
        let ultimates: any[]=[];
        Object.entries(data[1]).forEach((element,key)=>{


            if(key == 0){
                ultimates.push({
                    name: element[0],
                    taxonomy: this.developmentFuntion(element[1])
                })
                ultimates.sort(function(a:any,b:any) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
            }else{
              this.developmentFuntion(element[1]);
                ultimates.push({
                    name: element[0],
                    taxonomy: this.developmentFuntion(element[1])
                })
                ultimates.sort(function(a:any,b:any) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
            }
        })
        devData = {development_type:data[0],ultimates:ultimates}
        return devData;
    }

    developmentFuntion(elementData:any){
        var elemData:any = elementData;
        let texonom1: any[]=[];
        let taxonomy_id:any;
        let indicator1: any[]=[];
        let question1: any;
        let country1: any[]=[];
        let indicator_score:any=[];
        Object.entries(elemData).forEach((elem) => {
            indicator1 = [];
            var elemeData:any = elem[1];
            Object.entries(elemeData).forEach((eleme)=>{
              question1 = [];
                var ele:any = eleme[1];
                indicator_score = [];
                let actual_score1 = 0;
                let actual_score2 = 0;
                let indicator_score1 = 0;
                let indicator_score2 = 0;
                let country_percantag1 = 0;
                let country_percantag2 = 0;
                let question_status1:any;
                let question_status2:any;
                Object.entries(ele).forEach((el)=>{
                    country1 = [];
                    var e:any = el[1];
                    //console.log(e)

                    e.sort(function(a:any,b:any) {return (a.c_id > b.c_id) ? 1 : ((b.c_id > a.c_id) ? -1 : 0);} );
                    //console.log(e)
                    e.forEach((elmnt:any,index:any) => {
                        taxonomy_id = elmnt.taxonomy_id;
                      country1.push(elmnt.c_name);
                        if(index == 0){
                            question_status1 = elmnt.status;
                            actual_score1 += elmnt.actual_score;
                            indicator_score1 = elmnt.indicator_score;
                        }else{
                            actual_score2 += elmnt.actual_score;
                            question_status2 = elmnt.status;
                            indicator_score2 = elmnt.indicator_score;
                        }
                    });
                    question1.push({
                        name:el[0],
                        question_status1:question_status1,
                        question_status2:question_status2
                    })
                })
                country_percantag1 = Math.round(Math.round((actual_score1/indicator_score1)* 100)/20);
                country_percantag2 = Math.round(Math.round((actual_score2/indicator_score2)* 100)/20);
                let score = {
                    country_1:country1[0],
                    country_2:country1[1],
                    indicator_score1:indicator_score1,
                    actual_score1:actual_score1,
                    indicator_score2:indicator_score2,
                    actual_score2:actual_score2,
                    country_percantag1:country_percantag1,
                    country_percantag2:country_percantag2
                }
                indicator_score.push(score);

                question1.map((q:any) =>{
                    if(q.name.indexOf("?") == -1) {
                    q.name =  q.name + '?';
                   }

                });

                indicator1.push({
                    name:eleme[0],
                    questions:question1,
                    countries: country1,
                    score:indicator_score
                })
                indicator1.sort(function(a:any,b:any) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
                indicator1.map((i:any) =>{
                    let obj = i.questions.find((que:any) => que.question_order > 0);
                    if(obj){
                        i.questions.sort(function(a:any,b:any) {return (a.question_order > b.question_order) ? 1 : ((b.question_order > a.question_order) ? -1 : 0);} );
                    }else{
                        i.questions.sort(function(a:any,b:any) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
                    }
                })
            })
            texonom1.push({
                id:taxonomy_id,
                name: elem[0],
                indicator:indicator1
            })
            texonom1.sort(function(a:any,b:any) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
        });
        return texonom1;
    }

    handleCountryChanges(event:any){

        if (this.countriesForm.value.length < 3) {
            this.mySelections = this.countriesForm.value;
            setTimeout(() => {
                if(this.mySelections.length ==  2){
                    this.countries = this.mySelections.toString();
                    this.comparativeOverviewDetails();
                    this.comparativeInformationChart();
                    this.topcountriesChart()
                    localStorage.removeItem('selected_country');
                    localStorage.setItem("selected_country", this.countries);
                    localStorage.removeItem('selected_year_country');
                    localStorage.setItem("selected_year_country", this.year);
                    this.mySelect.close();
                }
            }, 500);
        }
    }

    handleCountryies(val:any){
        if(this.countriesForm.value.length == 3) {
            this.selecte_array.shift();
            this.selecte_array.push(val);
            this.countriesForm.setValue(this.selecte_array);
            this.mySelections = this.countriesForm.value;
            setTimeout(() => {
                if(this.mySelections.length ==  2){
                    this.countries = this.mySelections.toString();
                    this.comparativeOverviewDetails();
                    this.comparativeInformationChart();
                    this.topcountriesChart()
                    localStorage.removeItem('selected_country');
                    localStorage.setItem("selected_country", this.countries);
                    localStorage.removeItem('selected_year_country');
                    localStorage.setItem("selected_year_country", this.year);
                    this.mySelect.close();
                }
            }, 500);
        }else if(this.countriesForm.value.length == 2) {
            this.selecte_array = this.countriesForm.value;
        }
    }

    handleToolTipCountry() {
        this.showToolTipCountry = false;
        localStorage.setItem('toolTipCountry', JSON.stringify(false));
    }

    handleToolTipTable() {
        this.showToolTipTable = false;
        localStorage.setItem('toolTipTable', JSON.stringify(false));
    }

    someMethod(){
        this.selected_langth = this.countriesForm.value.length;
    }

    compare(c1: {name: string}, c2: {name: string}) {
        return c1 && c2 && c1.name === c2.name;
    }

    ngOnDestroy(): void {
        this._utilities.showHeaderMenu.next(false);
        this._utilities.governanceTypeSource.unsubscribe;
        this.triggerInit = false;
    }

    isValue: number = 0;

    toggle(num: number) {        
        this.isValue = num;
    }

    changeGovernance(num: number) {
        this.governance = num;
        localStorage.setItem('governance_id', JSON.stringify(num));
        this._utilities.governanceTypeSource.next(num);

    }
}
