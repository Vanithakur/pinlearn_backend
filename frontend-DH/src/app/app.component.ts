import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    NgcCookieConsentService,
    NgcNoCookieLawEvent,
    NgcInitializeEvent,
    NgcStatusChangeEvent,
} from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy  {
    title = 'digital-health';

    //keep refs to subscriptions to be able to unsubscribe later
    private popupOpenSubscription!: Subscription;
    private popupCloseSubscription!: Subscription;
    private initializeSubscription!: Subscription;
    private statusChangeSubscription!: Subscription;
    private revokeChoiceSubscription!: Subscription;
    private noCookieLawSubscription!: Subscription;

    constructor(private ccService: NgcCookieConsentService) {}

    ngOnInit(): void {
        // subscribe to cookieconsent observables to react to main events
        this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(() => {
            // you can use this.ccService.getConfig() to do stuff...
        });

        this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
            () => {
                // you can use this.ccService.getConfig() to do stuff...
            }
        );

        this.initializeSubscription = this.ccService.initialize$.subscribe(
            (event: NgcInitializeEvent) => {
                // you can use this.ccService.getConfig() to do stuff...
            }
        );

        this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
            (event: NgcStatusChangeEvent) => {
                // you can use this.ccService.getConfig() to do stuff...
                if (event.status === 'allow' || event.status === 'deny') {
                    this.ccService.close(false); // Hide revoke button after accepting cookies
                }
            }
        );

        this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
            () => {
                // you can use this.ccService.getConfig() to do stuff...
            }
        );

        this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
            (event: NgcNoCookieLawEvent) => {
                // you can use this.ccService.getConfig() to do stuff...
            }
        );

        if (this.ccService.hasAnswered()) {
            this.ccService.destroy();
        }

        localStorage.setItem('toolTipTable', JSON.stringify(true));
        localStorage.setItem('toolTipCountry', JSON.stringify(true));
        localStorage.setItem('toolTipNdhsMap', JSON.stringify(true));

        var years = ['2021'];
        if (localStorage.getItem('governance_id')) {
            localStorage.removeItem('governance_id');
            localStorage.setItem('governance_id', JSON.stringify(1));
        }

        if (localStorage.getItem('year') == null) {
            localStorage.setItem('year', JSON.stringify(2021));
        }

        if (localStorage.getItem('selected_years') == null) {
            localStorage.setItem('selected_years', JSON.stringify('2021'));
        }

        if (localStorage.getItem('country_id') === null) {
            localStorage.setItem('country_id', JSON.stringify('14'));
            localStorage.setItem('country_flag', JSON.stringify('au.png'));
            localStorage.setItem('country_iso_code', JSON.stringify('AU'));
            localStorage.setItem('country_name', JSON.stringify('Australia'));
        }
    }

    ngOnDestroy() {
        // unsubscribe to cookieconsent observables to prevent memory leaks
        this.popupOpenSubscription.unsubscribe();
        this.popupCloseSubscription.unsubscribe();
        this.initializeSubscription.unsubscribe();
        this.statusChangeSubscription.unsubscribe();
        this.revokeChoiceSubscription.unsubscribe();
        this.noCookieLawSubscription.unsubscribe();
      }
}
