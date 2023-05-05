import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material.module';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    CheckoutComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class CheckoutModule { }
