import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ServiceDataService } from 'src/app/shared/service-data/service-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserRegister } from './userRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public result: object;
  public registerdForm: FormGroup;
  // tslint:disable-next-line: max-line-length
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  successMessage: string;

  constructor(private repo: ServiceDataService, private router: Router, private activatedRouter: ActivatedRoute) {
    this.registerdForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      conformPassword: new FormControl(null, this.passValidator),
      contactNum: new FormControl(null, [Validators.required]),
    });
    this.registerdForm.controls.password.valueChanges.subscribe(
      x => this.registerdForm.controls.conformPassword.updateValueAndValidity()
    );
  }

  ngOnInit() {  }

  validateControl(controlName: string) {
    if (
      this.registerdForm.controls[controlName].invalid &&
      this.registerdForm.controls[controlName].touched
    ) {
      return true;
    }
    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.registerdForm.controls[controlName].hasError(errorName)) {
      return true;
    }
    return false;
  }

  passValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const conformPasswordValue  = control.value;
      const passControl = control.root.get('password');
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== conformPasswordValue || passValue === '') {
          return {
            isError: true
          };
        }
      }
    }
    return null;
  }

  onFormSubmit(data: any) {
    if (this.registerdForm.valid) {
      this.submitData(data);
    }
  }

  public submitData(data: any) {

    const userDetails: UserRegister = {
      email: data.email,
      userName: data.userName,
      contactNum: data.contactNum,
      password: data.password
    };

    // const formDataDetails = new FormData();
    // formDataDetails.append('email', data.email);
    // formDataDetails.append('password', data.password);
    // formDataDetails.append('userName', data.userName);
    // formDataDetails.append('contactNum', data.contactNum);
    // console.log('formDataDetails' + formDataDetails);

    const url = 'user/register';

    this.repo.create(url, userDetails).subscribe(
      res => {
        this.result = res;
        this.successMessage = 'Registered Successful';
        this.router.navigate(['sign_in']);
      },
      (error) => {
        this.successMessage = `Some Error: ${error}`;
      }
    );
  }
}
