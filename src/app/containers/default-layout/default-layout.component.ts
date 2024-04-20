import { Component, OnInit, Directive, HostListener, } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { CommonService } from '../../core/services/Common/common.service';
import { HelperService } from '../../core/services/Helper/helper.service';
import { noSpace } from '../../shared/custom-validators/nospacesvalidator';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { environment } from '../../../environments/environment';

import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
})

export class DefaultLayoutComponent implements OnInit {
  @HostListener('input', ['$event'])
  showAdmin: any = true;
  subscriptions: Subscription[] = [];
  isLoading: boolean = false;
  currentPage: any = 1;
  typeSelected: any;
  userType: any = "1";
  aboutMe: any;
  donotShowFooter = false;
  productCategoryList: any = []
  hideSideMenuStatus: boolean = false;
  hideSideMenuStatus2: boolean = false;
  shop_id: any;
  status: any;
  id: any;
  advertisement_id: any;
  imgUrl: any = ''
  imageStatus = 0;
  fullName: any = '';
  searchText: any = '';
  headerTab: any = '';
  categoryList: any = '';
  contactDetails: any;
  is_active_menu: any;
  product_id: any;
  seller_name: any = '';
  unReadNotification: any;
  sellerUnreadNotification: any;


  constructor(private spinner: NgxSpinnerService, private helperService: HelperService,
    private commonService: CommonService,
    private _formBuilder: FormBuilder,
    private router: Router) {

   
  }

  ngOnInit(): void {

  }



  hideSideMenu2() {
    var screenWidth = window.innerWidth;

    if (screenWidth < 992) {
      this.hideSideMenuStatus2 = !this.hideSideMenuStatus2;
      this.hideSideMenuStatus = !this.hideSideMenuStatus;
    } else {
      this.hideSideMenuStatus2 = !this.hideSideMenuStatus2;
    }
  }


  navigateToLogin(){
    this.router.navigate(['home/login'])
  }
}