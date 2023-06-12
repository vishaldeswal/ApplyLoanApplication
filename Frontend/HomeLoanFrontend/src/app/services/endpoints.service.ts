import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  constructor() { }
  //domain server
  public endpoint: string = "https://localhost:44382/";


  /*Login and Register EndPoints*/

  //endpoint for all user loan application by user
  public allLoanApplicationsForUserByUserEndpoint = `${this.endpoint}api/Loan`;
  //endpoint for user login
  public userLogin = `${this.endpoint}api/User`;
  //endpoint for advisor login
  public advisorLogin = `${this.endpoint}api/Advisor`;
  //endpoint for user register
  public userRegister = `${this.endpoint}api/User`;
  //endpoint for update password for user
  public updateUserPassword = `${this.endpoint}api/User`;
  //endpoint to update advisor password
  public updateAdvisorPassword = `${this.endpoint}api/Advisor`;


  /*Location Management Endpoints*/
  //endpoint to get all countries
  public allCountries = `${this.endpoint}api/CountryStateCity/GetAllCountriesTask`;
  //endpoint to get all states
  public allStates = `${this.endpoint}api/CountryStateCity/GetAllStateTask`;
  //endpoint to get all cities
  public allCities = `${this.endpoint}api/CountryStateCity/GetAllCitiesTask`;
  //endpoint to add the country
  public addCountry = `${this.endpoint}api/CountryStateCity/AddCountryCodeTask`;
  //endpoint to add the state
  public addState = `${this.endpoint}api/CountryStateCity/AddStateCodeTask`;
  //endpoint to add the city
  public addCity = `${this.endpoint}api/CountryStateCity/AddCityCodeTask`;
  //endpoint to edit the country
  public editCountry = `${this.endpoint}api/CountryStateCity/EditCountryActionTask`;
  //endpoint to edit the state
  public editState = `${this.endpoint}api/CountryStateCity/EditStateActionTask`;
  //endpoint to edit the city
  public editCity = `${this.endpoint}api/CountryStateCity/EditCityActionTask`;
  //endpoint to delete the country
  public deleteCountry = `${this.endpoint}api/CountryStateCity/RemoveCountryActionTask`;
  //endpoint to delete the state
  public deleteState = `${this.endpoint}api/CountryStateCity/RemoveStateActionTask`;
  //endpoint to delete the city
  public deleteCity = `${this.endpoint}api/CountryStateCity/RemoveCityActionTask`;


  /*Loan Management Endpoints  */
  //endpoint to apply loan application
  public applyLoan = `${this.endpoint}api/Loan`;
  //endpoint to apply loan application
  public loanEndpoints = `${this.endpoint}api/Loan`;
  //endpoint for all applied loan applications for all user by advisor
  public allAppliedLoanApplicationByAdvisor = `${this.endpoint}api/Loan/GetAllAppliedLoanApplicationByAdvisorTask`;
  //endpoint to fetch an loan application of UserLoanApplicationDTO type by user
  public loanApplicationDetailsByUser = `${this.endpoint}api/Loan/GetAnLoanApplicationByUserTask`;
  // endpoint to fetch an loan application of AdvisorLoanApplication type by advisor
  public loanApplicationDetailsByAdvisor = `${this.endpoint}api/Loan/GetAnAppliedLoanApplicationByAdvisorTask`;
  //endpoint to change the loan apllication status type
  public changeLoanApplicationStatusByUser = `${this.endpoint}api/Loan/ChangeApplicationStatusFromCreatedToAppliedByUserTask`;

  /*Promotion Endpoints */
  //endpoint to add new Promotion
  public addPromotion = `${this.endpoint}api/Promotions`;
  //endpoint to fetch a current active Promotion.
  public activePromtion = `${this.endpoint}api/Promotions`;

  /*Collateral Endpoints */
  public collateralList = `${this.endpoint}api/Collateral`;
  public linkCollateral = `${this.endpoint}api/Collateral/LinkCollateralToLoanApplicationActionTask`;
  //endpoint to create a collateral for user
  public createCollateralByUser = `${this.endpoint}api/Collateral`;
  public collateralEndpoint = `${this.endpoint}api/Collateral`

  //endpoint to fetch all non applied loan application by advisor
  public allNonAppliedLoanApplicationsByAdvisor = `${this.endpoint}api/Loan/GetAllNonAppliedLoanApplicationByAdvisorTask`;


  //endpoint to get all collateral for user
  public userCollateralList = `${this.endpoint}api/Collateral`;
  //this endpoint is used to delete a collateral
  public deleteUserCollateral = `${this.endpoint}api/Collateral`;
  //this endpoint is to change application status by advisor
  public changeApplicationStatusByAdvisor = `${this.endpoint}api/Loan/ChangeLoanStatusByAdvisorTask`;
}
