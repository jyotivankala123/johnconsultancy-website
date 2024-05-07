import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../../core/services/Common/common.service';
import { HelperService } from '../../../core/services/Helper/helper.service';
import { noSpace } from '../../../shared/custom-validators/nospacesvalidator';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  subscriptions: Subscription[] = [];
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

  category_id:any = '';
  user_cv:any = '';

  categoryList:any = [];

  image:any = '';
  imageObj:any = '';

  constructor(
    private fb: FormBuilder,
    private helperService: HelperService,
    private commonService: CommonService,
    private router: Router,
  ) {

  
  }

  ngOnInit() {
    this.createRegForm();
    this.fetchOrderList()
   
  }

  
  createRegForm() {
    this.regForm = this.fb.group({
      full_name: ['', [Validators.required, noSpace]],
      mobile_no: ['', [Validators.minLength(10), noSpace]],
      category_id: [],
    })
  }


  get rf() {
    return this.regForm.controls;
  }


  submitRegForm() {
    this.formSubmitted = true;
    console.log("INVQQ : ", this.regForm);
    if(this.regForm.invalid || this.category_id == '' || this.user_cv == '') return;

    this.regRequestData.url = '/register';
    this.regRequestData.data = {
      full_name: this.regForm.get('full_name').value,
      category_id: this.category_id,
      phone: this.regForm.get('mobile_no').value,
      cv: this.user_cv,
     
    }

    this.isLoading = true;
    this.commonService.postAPICall(this.regRequestData).subscribe((result)=>{
      this.isLoading = false;
      if(result.status == 200) {
       
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


  fileUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      const mainFile: File = event.target.files[0];
      // if (event.target.files[0].type.split('/')[1] != 'png' && event.target.files[0].type.split('/')[1] != 'jpg' && event.target.files[0].type.split('/')[1] != 'jpeg') {
      //   this.helperService.showError('Only JPG/JPEG/PNG files allowed');
      //   return;
      // }
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => {

        this.image = event.target?.result;
        this.imageObj = mainFile;

        let formData: FormData = new FormData();
        if (this.imageObj) {
          formData.append('file', this.imageObj, this.imageObj.name);
        }
        this.isLoading = true;
       // this.spinner.show();
        this.subscriptions.push(
          this.commonService.postAPICall({
            url: '/upload-cv',
            data: formData
          }).subscribe((result) => {

            this.isLoading = false;
           // this.spinner.hide();
            if (result.status == 200) {
              this.user_cv = result.data.filepath;

            }
            else {
              this.helperService.showError(result.data.errors[0].message);
            }
          }, (err) => {
            this.isLoading = false;
            this.helperService.showError(err.error.message);
          })
        )
      };
    }
  }

  fetchOrderList() {
    this.subscriptions.push(
      this.commonService.getAPICall({
        url: '/fetch-categories',
      }).subscribe((result) => {

      
        this.isLoading = false;
        if (result.status == 200) {
          this.categoryList = result.data;
 
        }
        else {
          this.helperService.showError(result.msg);
        }
      }, (err) => {
        this.isLoading = false;
        this.helperService.showError(err.error.msg);
      })
    )
  }


  selectMealType(event:any){
    console.log(event.target.value)
    this.category_id = event.target.value;
  }
}
