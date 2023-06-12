import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import CountryDTO from 'app/interfaces/country-DTO';
import { InitializerService } from 'app/services/initializer.service';
import { ListCountryStateCityService } from '../../list-country-state-city.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent implements OnInit {

  @Input() availableCountries: CountryDTO[] = [] ;
  @Output() reloadComponent= new EventEmitter<void>();
 
  private country: CountryDTO= this.initializer.createCountryDTO;
  private uniqueCode:string = "";
  countryForm!:FormGroup;
  
  constructor(
    private initializer: InitializerService,
    private listCountryStateCityService: ListCountryStateCityService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
      this.uniqueCode= this.listCountryStateCityService.generateUniqueNumber(this.availableCountries);
      this.countryForm = new FormGroup({
        code: new FormControl(this.uniqueCode, Validators.required),
        name: new FormControl('', Validators.required)
      });
  }

  onAdd(){
    this.mapFormtoDTO();
    this.listCountryStateCityService.addCountry(this.country).subscribe({
      next:(response)=>{
        this.showMessage("Country added successfully.", 4000);
        
      },
      error:(err)=>{
        this.showMessage(err.message, 4000);
      }
    });
    
    this.reloadComponent.emit();
    this.resetForm();
  }

  private mapFormtoDTO(){
    if (this.countryForm.valid) {
      this.country.code = this.countryForm.value.code!;
      this.country.name = this.countryForm.value.name!;
    }
    
  }

  private showMessage(message: string, duration: number): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: duration,
    });
  }

  resetForm(){
    this.countryForm.reset();

    Object.keys(this.countryForm.controls).forEach(key => {
      const control = this.countryForm.get(key);
      control?.setValidators(null);
      control?.setErrors(null);
      control?.updateValueAndValidity();
    });
  }

}
