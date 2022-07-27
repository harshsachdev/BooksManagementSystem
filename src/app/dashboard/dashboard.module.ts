import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { BoxContentComponent } from '../shared/box-content/box-content.component';



@NgModule({
  declarations: [
    DashboardComponent,
    BoxContentComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    DashboardComponent,
    DashboardRoutingModule
  ]
})
export class DashboardModule {}
