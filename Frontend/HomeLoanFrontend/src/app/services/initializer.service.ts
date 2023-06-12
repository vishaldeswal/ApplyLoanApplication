import { Injectable } from '@angular/core';
import AdvisorLoanApplicationDTO from 'app/interfaces/advisor-loan-application-DTO';
import ApplyLoanApplicationDTO from 'app/interfaces/apply-loan-application-DTO';
import { CollateralDTO } from 'app/interfaces/collateral-DTO';
import LoginDTO from 'app/interfaces/login-DTO';
import RegisterUserDTO from 'app/interfaces/register-user-DTO';
import UpdatePasswordDTO from 'app/interfaces/update-password-DTO';
import PromotionDTO from 'app/interfaces/promotion-DTO';
import UserLoanApplicationDTO from '../interfaces/user-loan-application-DTO';
import { LinkCollateralDTO } from 'app/interfaces/link-collateral-DTO';
import CreateCollateralDTO from 'app/interfaces/create-collateral-dto';
import CountryDTO from 'app/interfaces/country-DTO';
import StateDTO from 'app/interfaces/state-DTO';
import CityDTO from 'app/interfaces/city-DTO';
import { EditCollateralDTO } from 'app/interfaces/edit-collateral-dto';
import UserCollateralDTO from 'app/interfaces/user-collateral-DTO';
import { EditLoanDTO } from 'app/interfaces/edit-loan-dto';

@Injectable({
  providedIn: 'root'
})
export class InitializerService {
  constructor() {
  }
  public userLoanApplicationDTO: UserLoanApplicationDTO = {
    id: "",
    emailId: "",
    address: "",
    size: 0,
    cost: 0,
    registrationCost: 0,
    monthlyFamilyIncome: 0,
    otherIncome: 0,
    loanAmount: 0,
    loanDuration: 0,
    loanStartDate: "",
    status: "Created"
  }
  public loginDTO: LoginDTO = {
    emailId: "",
    password: ""
  }
  public registerUserDTO: RegisterUserDTO = {
    emailId: "",
    password: "",
    mobileNumber: "",
    cityCode: "",
    stateCode: "",
    countryCode: ""
  }
  public applyLoanApplicationDTO: ApplyLoanApplicationDTO = {
    address: "",
    size: 0,
    cost: 0,
    registrationCost: 0,
    monthlyFamilyIncome: 0,
    otherIncome: 0,
    loanAmount: 0,
    loanDuration: 0,
    loanStartDate: ""
  }
  public advisorLoanApplicationDTO: AdvisorLoanApplicationDTO = {
    id: "",
    emailId: "",
    address: "",
    size: 0,
    cost: 0,
    registrationCost: 0,
    monthlyFamilyIncome: 0,
    otherIncome: 0,
    loanAmount: 0,
    loanDuration: 0,
    loanStartDate: "",
    type: "",
    value: 0,
    share: 0,
    eligibility: "",
    status: ""
  }
  public updatePasswordDTO: UpdatePasswordDTO = {
    password: "",
    newPassword: ""
  }

  public createPromotionDTO: PromotionDTO ={
    startDate:"",
    endDate: "",
    type: "",
    message: ""
  }

 
  public collateralDTO: CollateralDTO = {
    type: '',
    value: 0,
    share: 0,
    id: ''
  }
  public linkCollateralDTO: LinkCollateralDTO = {
    collaterId: '',
    applicationId: ''
  }

  public createCollateralDTO: CreateCollateralDTO = {
    type: "",
    value: 0,
    share: 0
  }

  public createPromotionType : string[]= ['A', 'B', 'C'];
  
  public createCountryDTO:CountryDTO={
    id:"",
    name:"",
    code:""
  };

  public createStateDTO:StateDTO={
    id:"",
    name:"",
    code:"",
    countryCode: ""

  };
  public createCityDTO:CityDTO={
    id:"",
    name:"",
    code:"",
    stateCode: ""

  };
  public editCollateralDTO: EditCollateralDTO = {
    id: "",
    value: 0,
    share: 0
  }
  public userCollateralDTO: UserCollateralDTO = {
    id: "",
    type: "",
    value: 0,
    share: 0
  }

  public editLoanDTO: EditLoanDTO = {
    id: "",
    address: "",
    size: 0,
    cost: 0,
    registrationCost: 0,
    monthlyFamilyIncome: 0,
    otherIncome: 0,
    loanAmount: 0,
    loanDuration: 0,
    loanStartDate: ""
  }
}
