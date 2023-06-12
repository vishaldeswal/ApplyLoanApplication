import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import CityDTO from 'app/interfaces/city-DTO';
import CountryDTO from 'app/interfaces/country-DTO';
import StateDTO from 'app/interfaces/state-DTO';
import { InitializerService } from 'app/services/initializer.service';
import { ListCountryStateCityService } from './list-country-state-city.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-list-country-state-city',
  templateUrl: './list-country-state-city.component.html',
  styleUrls: ['./list-country-state-city.component.css']
})
export class ListCountryStateCityComponent implements OnInit {

  public showAddCountry: boolean = true;
  public showAddState: boolean = true;
  public showAddCity: boolean = true;

  public editCountry: CountryDTO = this.intializer.createCountryDTO;
  public editState: StateDTO = this.intializer.createStateDTO;
  public editCity: CityDTO = this.intializer.createCityDTO;

  //store value selected in "Add state" or "Edit state" form
  public selectedCountryNameForState: string = "";

  //store value selected in "Add city" or "Edit city" form
  public selectedCountryNameForCity: string = "";
  public selectedStateNameForCity: string = "";


  //To display available countries. 
  public availableCountries: CountryDTO[] = [];
  //To display available state according to selected country in "Show State table".
  public availableStates: StateDTO[] = [];

  //To display avialble states according to selected country in "Show Cities tabble", "Add city" and "Edit City" form.
  public availableStatesForCity: StateDTO[] = [];
   //To display available city according to selected country and state in "Show City table".
  public availableCities: CityDTO[] = [];

  public stateForm!: FormGroup;
  public cityForm!: FormGroup;


  constructor(
    private intializer: InitializerService,
    private router: Router,
    private listCountryStateCityService: ListCountryStateCityService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    //Initialsing availableCountries.
    this.listCountryStateCityService.getAllCountries().subscribe({
      next: (response) => {
        this.availableCountries = response;
      },
      error: (err) => {
        console.log("Error occured in fetching all countries");
      }
    });
    
    //Forms intialisation
    this.stateForm = new FormGroup({
      countryName: new FormControl("", Validators.required)
    });

    this.cityForm = new FormGroup({
      countryName: new FormControl("", Validators.required),
      stateName: new FormControl("", Validators.required)
    });
  }

  

  /* ------------ COUNTRY RELATED TASK --------------- */
  
  //On click of edit button in country row.
  onEditCountry(country: CountryDTO) {
    this.editCountry = country;
    this.changeShowAddCountry(false); //to show edit "edit country form"
  }

  //To again show "add country form" after edit successfully updated.
  changeShowAddCountry(value: boolean) {
    this.showAddCountry = value;
  }

  //On click of delete button in country row. 
  onRemoveCountry(countryId: string){
    this.listCountryStateCityService.deleteCountry(countryId).subscribe({
      next:(response)=>{
        this.showMessage("Country Deleted Successfully", 4000);
      },
      error:(err)=>{
        this.showMessage("Country deletion Operation Failed", 4000);
      }

      });
      this.reloadComponent();
    }

    isCountryAvailable():boolean{
      return this.availableCountries.length > 0;
    }

   /* ------------ STATE RELATED TASK --------------- */
  
  //Store the selected country in the "Show State Form"
   onCountryChangeForState(countryValue: string) {
    this.selectedCountryNameForState = countryValue;
    }

  //Fetch and store the all States in "availableStates" variable. For displaying in table 
    onShowStates() {
      this.listCountryStateCityService.getStatesOf(this.selectedCountryNameForState).subscribe(
        (response) => {
          this.availableStates = response;
        }
      );
      this.resetStateForm();
  
    }  
    
    //On click of edit button in edit row.
    onEditState(state: StateDTO) {
      this.editState = state; //storing value of state needs to edited
      this.changeShowAddState(false); // to display "Edit state" form
    }

    //On selecting new country in dropdown of "Show State" Form/
    updateAvailableState(country: string){
      this.onCountryChangeForState(country);
    }

    //For displaying "Add State"  Form.
    changeShowAddState(value: boolean) {
      this.showAddState = value;
    }


     //On click of delete button in state row. 
    onRemoveState(stateId: string){
      this.listCountryStateCityService.deleteState(stateId).subscribe({
      next:(response)=>{
        this.showMessage("State Deleted Successfully", 4000);
        this.reloadComponent();
      },
      error:(err)=>{
        this.showMessage("State deletion Operation Failed", 4000);
      }

      });
    }

    isStatesAvailable():boolean{
      return this.availableStates.length>0;
    }
    
    //For reseting "Show State" Form
    resetStateForm(){
      this.stateForm.reset();
  
      Object.keys(this.stateForm.controls).forEach(key => {
        const control = this.stateForm.get(key);
        control?.setValidators(null);
        control?.setErrors(null);
        control?.updateValueAndValidity();
      });
    }

   /* ------------ CITY RELATED TASK --------------- */
  
   //Store the selected country in the "Show City Form" and Fetch Corresponding states for that country
   //On selecting value of country in "Show City" form
  onCountryChangeCity(countryValue: string) {

    this.selectedCountryNameForCity = countryValue;
    this.listCountryStateCityService.getStatesOf(countryValue).subscribe(
      (response) => {
        this.availableStatesForCity = response;
      }
    );
  }

  //On selecting value of state in "Show City" form
  onStateChangeCity(stateValue: string) {
    this.selectedStateNameForCity = stateValue;
  }
  
  //fetch and store all cities , corresponding to selected country and state.
  onShowCities() {
    this.listCountryStateCityService.getCitiesOf(this.selectedStateNameForCity, this.selectedCountryNameForCity).subscribe(
      (response) => {
        this.availableCities = response;
      }
    );
    this.resetCityForm();

  }

  //On click edit buttton in city row
  onEditCity(city: CityDTO) {
    this.editCity = city; //Store city needs to be edited.
    this.changeShowAddCity(false); // to show "Edit City" form;
  }

  updateAvailableStateForCity(country: string){
      this.onCountryChangeCity(country);
  }
 
  // For displaying "Add City" form
  changeShowAddCity(value: boolean) {
    this.showAddCity = value;
  }

   //On click of delete button in state row. 
   onRemoveCity(cityId: string){
    this.listCountryStateCityService.deleteCity(cityId).subscribe({
    next:(response)=>{
      this.showMessage("City Deleted Successfully", 4000);
      this.reloadComponent();
    },
    error:(err)=>{
      this.showMessage("City deletion Operation Failed", 4000);
    }

    });
  }

  getSizeofAvailableStateForCity():number{
    return this.availableStatesForCity.length;
  }

  isCitiesAvailable():boolean{
    return this.availableCities.length > 0 ;
  }

  
  resetCityForm(){
    this.cityForm.reset();

    Object.keys(this.cityForm.controls).forEach(key => {
      const control = this.cityForm.get(key);
      control?.setValidators(null);
      control?.setErrors(null);
      control?.updateValueAndValidity();
    });
  }

//* ------------ For Displaying tatus Message  --------------- */
  private showMessage(message: string, duration: number): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: duration,
    });
  }

  reloadComponent(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl, { replaceUrl: true });
    });
  }
}
