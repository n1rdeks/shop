import { Component, OnInit } from '@angular/core';
import {
    AsyncValidatorFn,
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    errors: string[];

    constructor(private fb: FormBuilder, private accountService: AccountService,
                private router: Router) { }

    ngOnInit(): void {
        this.createRegisterForm();
    }

    createRegisterForm() {
        this.registerForm = this.fb.group({
            displayName: [null, [Validators.required]],
            email: [null,
                [Validators.required, Validators.pattern('^(\\D)+(\\w)*((\\.(\\w)+)?)+@(\\D)' +
                    '+(\\w)*((\\.(\\D)+(\\w)*)+)?(\\.)[a-z]{2,}$')],
                [this.validateEmailOnFree()]
            ],
            password: [null, [Validators.required]]
        });
    }

    onSubmit() {
        this.accountService.register(this.registerForm.value).subscribe(() => {
            this.router.navigateByUrl('/shop');
        }, error => {
            console.log(error);
            this.errors = error.errors;
        });
    }

    validateEmailOnFree(): AsyncValidatorFn {
        return control => {
            return timer(500).pipe(
                switchMap(() => {
                    if (!control.value) {
                        return of(null);
                    }
                    return this.accountService.checkEmailExists(control.value).pipe(
                        map(result => {
                            return result ? {emailExists: true} : null;
                        })
                    );
                })
            );
        };
    }

}
