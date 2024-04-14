import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultLayoutComponent } from './containers';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { RouterModule } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorHandler } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { CarouselModule } from 'ngx-owl-carousel-o';


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  handleError(err: any): void {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    if (chunkFailedMessage.test(err.message)) {
      window.location.reload();
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CarouselModule, 
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }, { provide: LOCALE_ID, useValue: 'en-GB' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
