import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import CountryDTO from 'app/interfaces/country-DTO';
import { InitializerService } from 'app/services/initializer.service';
import { ListCountryStateCityService } from '../../list-country-state-city.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.css']
})
export class EditCountryComponent implements OnInit{
  
  @Input() public country: CountryDTO= this.initializer.createCountryDTO;
  
  @Output() showAddCountry= new EventEmitter<boolean>();
  @Output() reloadComponent= new EventEmitter<void>();
  countryForm!:FormGroup;
  
  constructor(
    private initializer: InitializerService,
    private listCountryStateCityService: ListCountryStateCityService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.countryForm = new FormGroup({
      id: new FormControl(this.country.id, Validators.required),
      code: new FormControl(this.country.code, Validators.required),
      name: new FormControl(this.country.name, Validators.required)
    });
}

  onAdd(){
    this.mapFormtoDTO();
    this.listCountryStateCityService.editCountry(this.country).subscribe({
      next:(response)=>{
        this.showMessage("Country updated successfully.", 4000);
      },
      error:(err)=>{
        this.showMessage(err.message, 4000);
      }
    });
    this.reloadComponent.emit();
    this.countryForm.reset();
    this.insertBackAddCountry();
  }

  public insertBackAddCountry(){
    this.showAddCountry.emit(true);
  }

  private mapFormtoDTO(){
    if (this.countryForm.valid) {
      this.country.id=this.countryForm.value.id!
      this.country.code = this.countryForm.value.code!;
      this.country.name = this.countryForm.value.name!;
    }
    
  }

  private showMessage(message: string, duration: number): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: duration,
    });
  }
  
}
