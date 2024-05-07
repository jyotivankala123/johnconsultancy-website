import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; // Import FormsModule

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    UsersRoutingModule,
    FormsModule, // Include FormsModule in imports,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
