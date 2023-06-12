import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import CityDTO from 'app/interfaces/city-DTO';
import CountryDTO from 'app/interfaces/country-DTO';
import StateDTO from 'app/interfaces/state-DTO';
import { InitializerService } from 'app/services/initializer.service';
import { ListCountryStateCityService } from '../../list-country-state-city.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent {
   
  @Input() availableCountries: CountryDTO[] = [] ;
  @Input() availableStates: StateDTO[]=[];
  @Input() availableCities: CityDTO[]=[];
  @Output() stateOfNewCountry= new EventEmitter<string>();
  @Output() reloadComponent= new EventEmitter<void>();
  
  private city: CityDTO= this.initializer.createCityDTO;
  private uniqueCode:string = "";
  private selectedStateCode: string="";
  cityForm!:FormGroup;
  

  constructor(
    private initializer: InitializerService,
    private listCountryStateCityService: ListCountryStateCityService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.uniqueCode= this.listCountryStateCityService.generateUniqueNumber(this.availableCities);
    this.cityForm = new FormGroup({
      code: new FormControl(this.uniqueCode, Validators.required),
      name: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required)
    });
  }

  onAdd(){
    this.mapFormtoDTO();
    this.listCountryStateCityService.addCity(this.city).subscribe({
      next:(response)=>{
        this.showMessage("City added successfully.", 4000);
      },
      error:(err)=>{
        this.showMessage(err.message, 4000);
      }
    });
    this.reloadComponent.emit();
    this.resetForm();
  }
  onCountryChanges(country: string){
    this.stateOfNewCountry.emit(country);
  }
  onStateChanges(code: string){
    this.selectedStateCode= code;
  }

    private mapFormtoDTO(){
      if (this.cityForm.valid) {
        this.city.code = this.uniqueCode;
        this.city.name = this.cityForm.value.name!;
       this.city.stateCode= this.selectedStateCode;
      }
      
    }
  
    private showMessage(message: string, duration: number): void {
      this.snackBar.open(message, 'Dismiss', {
        duration: duration,
      });
    }

    resetForm(){
      this.cityForm.reset();
  
      Object.keys(this.cityForm.controls).forEach(key => {
        const control = this.cityForm.get(key);
        control?.setValidators(null);
        control?.setErrors(null);
        control?.updateValueAndValidity();
      });
    }

}
