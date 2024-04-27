import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../../core/services/Common/common.service';
import { HelperService } from '../../../core/services/Helper/helper.service';
import { noSpace } from '../../../shared/custom-validators/nospacesvalidator';
import * as moment from 'moment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm:FormGroup;
  formSubmitted: boolean = false;
  requestData: any = {};
  isLoading: boolean = false;

  regForm: FormGroup;
  regFormSubmitted: boolean = false;
  regRequestData: any = {};
  startDate = new Date();

  commonRequestData:any = {};
  countries:any = [];
  shwSignIn: boolean = true;
  shwSignUp: boolean = false;

  hideLogin: boolean = false;
  hideReg: boolean = false;
  hideRegCon: boolean = false;


  constructor(
    private fb: FormBuilder,
    private helperService: HelperService,
    private commonService: CommonService,
    private router: Router,
  ) {

  
  }

  ngOnInit() {
    this.createForm();
    this.createRegForm();
   
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, noSpace]],
      password: ['', [Validators.required, noSpace]]
    })
  }

  createRegForm() {
    this.regForm = this.fb.group({
      full_name: ['', [Validators.required, noSpace]],
      email: ['', [Validators.required,Validators.email, noSpace]],
      mobile_no: ['', [Validators.minLength(10), noSpace]],
      password: ['', [Validators.required, Validators.minLength(6), noSpace]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]],
      country_id: [],
      dob: ['', [Validators.required]]
    })
  }

  get f() {
    return this.loginForm.controls;
  }

  get rf() {
    return this.regForm.controls;
  }


  submitLoginForm() {
    this.formSubmitted = true;
    if(this.loginForm.invalid) return;

    this.requestData.url = 'login';
    this.requestData.data = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }

    this.isLoading = true;
    this.commonService.postAPICall(this.requestData).subscribe((result)=>{
      this.isLoading = false;
      if(result.status == 200) {
        localStorage.setItem('access-token',result.data.access_token);
        localStorage.setItem('refresh-token',result.data.refresh_token);
        localStorage.setItem('is_active',result.data.is_active);
        this.commonService.setUserStatus(result.data);
        this.helperService.showSuccess(result.msg);
          this.router.navigate(['/home']);
        
      }
      else{
        this.helperService.showError(result.msg);
      }
    },(err)=>{
      this.isLoading = false;
      this.helperService.showError(err.error.msg);
    })

  }


  submitRegForm() {
    this.regFormSubmitted = true;
    console.log("INVQQ : ", this.regForm);
    if(this.regForm.invalid) return;

    this.regRequestData.url = 'register';
    this.regRequestData.data = {
      full_name: this.regForm.get('full_name').value,
      email: this.regForm.get('email').value,
      mobile_no: this.regForm.get('mobile_no').value,
      password: this.regForm.get('password').value,
      confirm_password: this.regForm.get('confirm_password').value,
      // dob: moment(this.regForm.get('dob').value).format('YYYY-MM-DD'),

    }

    this.isLoading = true;
    this.commonService.postAPICall(this.regRequestData).subscribe((result)=>{
      this.isLoading = false;
      if(result.status == 200) {
        localStorage.setItem('access-token',result.data.access_token);
        localStorage.setItem('refresh-token',result.data.refresh_token);
        localStorage.setItem('is_active',result.data.is_active);
        this.commonService.setUserStatus(result.data);
        this.helperService.showSuccess(result.msg);
      }
      else{
        this.helperService.showError(result.msg);
      }
    },(err)=>{
      this.isLoading = false;
      this.helperService.showError(err.error.msg);
    })
  }

}
