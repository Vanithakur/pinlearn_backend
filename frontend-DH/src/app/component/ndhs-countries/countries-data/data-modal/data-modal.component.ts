import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';

@Component({
    selector: 'app-data-modal',
    templateUrl: './data-modal.component.html',
    styleUrls: ['./data-modal.component.css'],
})
export class DataModalComponent implements OnInit {
    ndhs_details:any=[];
    entries:any;
    loading: boolean = true;
    countryName:any;
    icon_class: any;
    constructor(
        private _common: CommonService,
        public dialogRef: MatDialogRef<DataModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
        this.icon_class = navigator.appVersion.indexOf("Mac") != -1 ? 'close-dialog-mac' : 'close-dialog';

        let payload = {
            governanceId: this.data.governance_id,
            development_id: this.data.development_id,
            taxonomy_id: this.data.taxonomy_id,
            countries:this.data.country_id
        }
        this._common.getComparativeOverview(payload).subscribe((result) => {
            this.entries = Object.entries(result);
            let viewDeatils :any;
            let development_type :any;
            let ultimate_type :any;
            let ultimates :any = [];
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
            this.loading = false;
        });
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
        });
        return taxonomy;        
    }
}
