import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
    selector: 'app-prospective-development',
    templateUrl: './prospective-development.component.html',
    styleUrls: ['./prospective-development.component.css'],
})
export class ProspectiveDevelopmentComponent implements OnInit {

    ndhs_details: any = [];
    entries: any;
    country_id: any;
    currentYear: any;
    governance_id: any;
    triggerInit: boolean = true;
    showloader: boolean = true;
    countryName:any;

    constructor(private _utilities: UtilitiesService, private _common: CommonService) { }

    ngOnInit(): void {
        this._utilities.showHeaderMenu.next(true);

        // this.governance_id = JSON.parse(localStorage.getItem('governance_id') || '');

        this._utilities.governanceTypeSource.subscribe((governanceId) => {
            this.governance_id = governanceId;
            this.ndhs_details = [];
            this.showloader = true;
            if(this.triggerInit){
                this.getViewData(governanceId);
            }
        });
    }

    getViewData(governanceId:any) {
        this.country_id = JSON.parse(localStorage.getItem("country_id") || '');
        this.currentYear = JSON.parse(localStorage.getItem('year') || '');
        this.governance_id = JSON.parse(localStorage.getItem('governance_id') || '');

        let payload = {
            governanceId: governanceId,
            development_id: 2,
            countries:this.country_id
        }

        this._common.getComparativeOverview(payload).subscribe((result) => {
            this.entries = Object.entries(result);
            let viewDeatils: any;
            let development_type: any;
            let ultimate_type: any;
            let ultimates: any = [];
            let self = this;
            this.entries.forEach(function (element: any) {
                development_type = element[0];
                Object.entries(element[1]).forEach(function (element2: any, index2: any) {
                    if (index2 == 0) {
                        ultimate_type = element2[0];
                        viewDeatils = { ...viewDeatils, development_type: development_type }
                        ultimates.push({
                            name: element2[0],
                            taxonomy:  self.developmentFuntion(element2[1])
                        })
                        ultimates.sort(function (a: any, b: any) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0); });
                        viewDeatils = { ...viewDeatils, ultimates, country_name: self.countryName }
                    } else if (index2 == 1) {
                        viewDeatils = { ...viewDeatils, development_type: development_type }
                        ultimate_type = element2[0];
                        ultimates.push({
                            name: element2[0],
                            taxonomy:  self.developmentFuntion(element2[1])
                        })
                        ultimates.sort(function (a: any, b: any) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0); });
                        viewDeatils = { ...viewDeatils, ultimates, country_name: self.countryName }
                    }
                });
            });
            this.ndhs_details.push(viewDeatils);
            this.showloader = false;
        });
    }

    handlePrint() {
        window.print();
    }

    ngOnDestroy(): void {
        this._utilities.showHeaderMenu.next(false);
        this._utilities.governanceTypeSource.next(this.governance_id);
        this._utilities.governanceTypeSource.unsubscribe;
        this.triggerInit = false;
    }

    developmentFuntion(elementData:any){
        let taxonomy: any = [];
        let indicator: any;
        let indicators: any = [];
        let taxonomyName: any;
        let questions: any = [];
        let self = this;
        Object.entries(elementData).forEach(function (element4: any) {
            taxonomyName = element4[0];
            indicators = [];
            Object.entries(element4[1]).forEach(function (element6: any) {
                questions = [];
                indicator = element6[0];
                element6[1].forEach(function (element7: any) {
                    self.countryName = element7.c_name;
                    questions.push(element7)
                });
                indicators.push({
                    name: indicator,
                    questions: questions
                })
            });
            indicators.sort(function(a:any,b:any) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
            indicators.map((i:any) =>{
                let obj = i.questions.find((que:any) => que.question_order > 0);
                if(obj){
                    i.questions.sort(function(a:any,b:any) {return (a.question_order > b.question_order) ? 1 : ((b.question_order > a.question_order) ? -1 : 0);} );
                }else{
                    i.questions.sort(function(a:any,b:any) {return (a.question_name > b.question_name) ? 1 : ((b.question_name > a.question_name) ? -1 : 0);} );
                }
            })
            taxonomy.push({
                name: taxonomyName,
                indicator: indicators
            })
            taxonomy.sort(function(a:any,b:any) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
        });
        return taxonomy;
    }

    toggle(num: number) {
        this.governance_id = num;
        localStorage.setItem('governance_id', JSON.stringify(num));
        this._utilities.governanceTypeSource.next(num);

    }
}
