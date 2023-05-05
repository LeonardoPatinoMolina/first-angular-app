import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThacksRoutingModule } from './thacks-routing.module';
import { ThacksComponent } from './thacks.component';


@NgModule({
  declarations: [
    ThacksComponent
  ],
  imports: [
    CommonModule,
    ThacksRoutingModule
  ]
})
export class ThacksModule { }
