import { Component, OnInit } from '@angular/core';
import {
    Form,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
    contactForm: any;
    windowScrolled: boolean = false;

    constructor(
        private fb: FormBuilder,
        public common: CommonService,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        window.addEventListener('scroll', () => {
            this.windowScrolled = window.pageYOffset > 0;
        });

        this.contactForm = this.fb.group({
            name: [null, Validators.required],
            subject: [null, Validators.required],
            email: [null, [Validators.required, Validators.email]],
            message: [null, Validators.required],
        });
    }

    scrollToTop() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }

    onSubmit(values: any) {
        this.common.contactUs(values.value).subscribe(
            (response) => {                           //Next callback
                this.successSnackBar('Form has been submitted successfully!', 'Close');            
                this.contactForm.reset();
            },
            (error) => {                     
              this.failedSnackBar(error.statusText, 'Close');            
              throw error;
            }
          )
    }

    get formControls() {
        return this.contactForm.controls;
    }

    failedSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 3000,
            panelClass: ['red-snackbar']
        });
    }

    successSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 3000,
            panelClass: ['green-snackbar']
        });
    }
}
