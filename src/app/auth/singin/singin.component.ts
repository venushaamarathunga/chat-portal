import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceDataService } from 'src/app/shared/service-data/service-data.service';
import { Router } from '@angular/router';

import { UserSignin } from './userSignin';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.scss'],
})
export class SinginComponent implements OnInit {

  public result: object;
  public signupForm: FormGroup;
  constructor(private repo: ServiceDataService, private router: Router) {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }


  ngOnInit() {}

  validateControl(controlName: string) {
    if (
      this.signupForm.controls[controlName].valid &&
      this.signupForm.controls[controlName].touched
    ) {
      return true;
    }
    return false;
  }

  hasError(controlName: string, errorName: string) {
    if (this.signupForm.controls[controlName].hasError(errorName)) {
      return true;
    }
    return false;
  }

  onFormSubmit(value: any) {
    if (this.signupForm.valid) {
      this.submitForm(value);
    }
  }

  private submitForm(data: any) {
    const userDetails: UserSignin = {
      email: data.email,
      password: data.password
    };

    const url = 'user/login';
    this.repo.create(url, userDetails).subscribe(
      res => {
        this.result = res;
        localStorage.setItem('token', res.toString());
        this.router.navigate(['dash']);
      },
      (error) => {}
    );
  }
}
