import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThacksComponent } from './thacks.component';

const routes: Routes = [{ path: '', component: ThacksComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThacksRoutingModule { }
