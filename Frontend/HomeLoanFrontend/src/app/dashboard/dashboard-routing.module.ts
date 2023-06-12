import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyLoanApplicationComponent } from './apply-loan-application/apply-loan-application.component';
import { ListOfLoanApplicationsCardComponent } from './list-of-loan-applications-card/list-of-loan-applications-card.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { AddPromotionComponent } from './add-promotion/add-promotion.component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
