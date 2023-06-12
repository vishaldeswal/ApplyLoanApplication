import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ListOfLoanApplicationsCardComponent } from './dashboard/list-of-loan-applications-card/list-of-loan-applications-card.component';
import { ApplyLoanApplicationComponent } from './dashboard/apply-loan-application/apply-loan-application.component';
import { UpdatePasswordComponent } from './dashboard/update-password/update-password.component';
import { LoanApplicationDetailsComponent } from './dashboard/list-of-loan-applications-card/loan-application-card/loan-application-details/loan-application-details.component';
import { AddPromotionComponent } from './dashboard/add-promotion/add-promotion.component';
import { ListOfNonAppliedLoanApplicationsCardComponent } from './dashboard/list-of-non-applied-loan-applications-card/list-of-non-applied-loan-applications-card.component';
import { CreateCollateralComponent } from './dashboard/collateral/create-collateral/create-collateral.component';
import { TypeAPromotionComponent } from './home/display-promotion/components/type-a-promotion/type-a-promotion.component';
import { TypeBPromotionComponent } from './home/display-promotion/components/type-b-promotion/type-b-promotion.component';
import { TypeCPromotionComponent } from './home/display-promotion/components/type-c-promotion/type-c-promotion.component';
import { ListCountryStateCityComponent } from './dashboard/list-country-state-city/list-country-state-city.component';
import { EditCollateralComponent } from './dashboard/collateral/edit-collateral/edit-collateral.component';
import { UserListOfCollateralsComponent } from './dashboard/user-list-of-collaterals/user-list-of-collaterals.component';
import { authGuard } from './services/auth.guard';
import { EditLoanComponent } from './dashboard/edit-loan/edit-loan.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children:[
      {
        path:"",
      component:TypeAPromotionComponent
      },
      {
        path:"",
      component:TypeBPromotionComponent
      },
      {
        path:"",
      component:TypeCPromotionComponent
      }

    ]
  },
  {
    path: "Dashboard",
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: "",
        component: ListOfLoanApplicationsCardComponent
      },
      {
        path: "OpenApplication",
        component: ListOfLoanApplicationsCardComponent
      },
      {
        path: "MyApplication",
        component: ListOfLoanApplicationsCardComponent
      },
      {
        path: "ApplyLoanApplication",
        component: ApplyLoanApplicationComponent
      },
      {
        path: "UpdatePassword",
        component: UpdatePasswordComponent
      },
      {
        path: "LoanApplicationDetails",
        component: LoanApplicationDetailsComponent
      },
      {
        path: "AddPromotion",
        component: AddPromotionComponent
      },
      {
        path: "ClosedApplication",
        component: ListOfNonAppliedLoanApplicationsCardComponent
      },
      {
        path: "create-collateral",
        component: CreateCollateralComponent
      },
      {
        path: "ListCountryStateCity",
        component: ListCountryStateCityComponent,
        
      },
      {
        path: "ListOfCollaterals",
        component: UserListOfCollateralsComponent
      },
      {
        path: "edit-collateral",
        component: EditCollateralComponent
      },
      {
        path: "edit-loan",
        component: EditLoanComponent
      }
    ]
  },
  {
    path: "Login",
    component: LoginComponent
  },
  {
    path: "Register",
    component: RegisterComponent
  },
  {
    path: "**",
    component: LoginComponent
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
