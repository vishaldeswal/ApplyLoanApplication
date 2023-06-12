import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import CityDTO from 'app/interfaces/city-DTO';
import CountryDTO from 'app/interfaces/country-DTO';
import StateDTO from 'app/interfaces/state-DTO';
import { InitializerService } from 'app/services/initializer.service';
import { ListCountryStateCityService } from '../../list-country-state-city.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.css']
})
export class EditCityComponent {
  @Input() availableCountries: CountryDTO[] = [] ;
  @Input() availableStates: StateDTO[]=[];
  @Input() public city: CityDTO= this.initializer.createCityDTO;
  @Output() stateOfNewCountry= new EventEmitter<string>();
  @Output() showAddCity = new EventEmitter<boolean>();
  @Output() reloadComponent= new EventEmitter<void>();
  
 
  
  private selectedStateCode: string="";
  cityForm!:FormGroup;
  

  constructor(
    private initializer: InitializerService,
    private listCountryStateCityService: ListCountryStateCityService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    
    this.cityForm = new FormGroup({
      id:new FormControl(this.city.id, Validators.required),
      code: new FormControl(this.city.code, Validators.required),
      name: new FormControl(this.city.name, Validators.required),
      country: new FormControl('', Validators.required),
      state: new FormControl(this.city.stateCode, Validators.required)
    });
  }

  onEdit(){
    this.mapFormtoDTO();
    this.listCountryStateCityService.editCity(this.city).subscribe({
      next:(response)=>{
        this.showMessage("City updated successfully.", 4000);
      },
      error:(err)=>{
        this.showMessage(err.message, 4000);
      }
    });
    this.reloadComponent.emit();
    this.resetForm();
    this.insertBackAddCity();
  }
  onCountryChanges(country: string){
    this.stateOfNewCountry.emit(country);
  }
  onStateChanges(code: string){
    this.selectedStateCode= code;
  }

    private mapFormtoDTO(){
      if (this.cityForm.valid) {
        this.city.name = this.cityForm.value.name!;
       this.city.stateCode= this.selectedStateCode;
      }
      
    }
  
    private showMessage(message: string, duration: number): void {
      this.snackBar.open(message, 'Dismiss', {
        duration: duration,
      });
    }

    public insertBackAddCity(){
      this.showAddCity.emit(true);
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
