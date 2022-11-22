import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    constructor(private http: HttpClient) { }

    public baseUrl = environment.baseUrl;

    public getNdhsDetails(
        governance_id: number,
        country_id: number,
        year: number
    ): Observable<any> {
        return this.http.get(
            this.baseUrl +
            'ndhs-master/governance-stats/' +
            governance_id +
            '/' +
            country_id +
            '/' +
            year
        );
    }


    public getComparative(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'ndhs-master/comparative', data);
    }

    public getComparativeInformation(data: any): Observable<any> {
        return this.http.post(
            this.baseUrl + 'ndhs-master/comparative-information',
            data
        );
    }

    public getComparativeOverview(data: any): Observable<any> {
        return this.http.post(
            this.baseUrl + 'ndhs-master/overview',
            data
        );
    }

    public getTopCountriesData(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'ndhs-master/top-countries', data);
    }

    public getExistedCountries(data: any): Observable<any> {
        let selected_years = JSON.parse(localStorage.getItem("selected_years") || "")
        if (selected_years && selected_years.length == 2) {
            return this.http.get(this.baseUrl + 'ndhs-master/country-list');
        } else {
            return this.http.get(this.baseUrl + 'ndhs-master/country-list?year=' + data.year);
            // return this.http.post(
            //     this.baseUrl + 'ndhs-master/existed-countries-list',
            //     data
            // );
        }
    }

    public getAllCountries(): Observable<any> {
        return this.http.get(this.baseUrl + 'ndhs-master/country-list');
    }

    public getTaxonomyTabledetails(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'ndhs-master/table-chart', data);
    }

    public getOverviewBarChart(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'ndhs-master/stats-graph', data);
    }

    // public getOverviewBubbleChart(data: any): Observable<any> {
    //     return this.http.post(this.baseUrl + 'ndhs-master/bubble-chart', data);
    // }

    public contactUs(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'contact-us/store', data).pipe(
            catchError((err) => {
                console.error(err);
                //Handle the error here
                return throwError(err);
            }))
    }

    public getdefaultCountry(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'ndhs-master/countries-with-year', data);
    }

    public getdefaultCountryYear(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'ndhs-master/countries-in-year', data);
    }


}
