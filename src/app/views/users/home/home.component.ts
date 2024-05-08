


import { OnInit ,Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../core/services/Common/common.service';
import { HelperService } from '../../../core/services/Helper/helper.service';
import { noSpace } from '../../../shared/custom-validators/nospacesvalidator';
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from 'rxjs';
import 'jquery'; // Import jQuery before importing Owl Carousel


import { OwlOptions } from 'ngx-owl-carousel-o';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  subscriptions: Subscription[] = [];
  page: number = 1;
  search: string = "";
  requestData: any = {};
  isLoading: boolean = false;

  homeList: any = [];
  homeMetaList: any = [];
  homeAdvertisments:any = [];
  homeAdvertismentsList:any = []; 

  employersServiced:any = 0;
  candidatesPlaced:any = 0;
  countriesServiced:any = 0;


  constructor(private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private helperService: HelperService,) {
    
  }

  
  ngOnInit(): void {

    setTimeout(() => {
      this.employersServiced = 300;
      this.candidatesPlaced = 400;
      this.countriesServiced = 1500;
    }, 3000);
   
    $('.my-carousel2').owlCarousel({
      margin: 30,
      items: 1,
      loop: false, //this is the key
      autoplay: true,
      dots: false,
      merge: false,
      responsive: {
        0: {
          items: 1
        },
        575: {
          items: 2
        },
        768: {
          items: 3
        },
        1000: {
          items: 4
        }
      },
      nav: true,
    });
  }



  customOptions: OwlOptions = {
    margin: 30,
    items: 1,
    loop: true,
    autoplay: true,
    dots: false,
    merge: true,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      575: {
        items: 2
      },
      768: {
        items: 3
      },
      1000: {
        items: 4
      }
    }

    
  }




  createRange(number: number) {
    return new Array(number).fill(0).map((n, index) => index + 1);
  }

}
