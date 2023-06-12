import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import StateDTO from 'app/interfaces/state-DTO';
import { InitializerService } from 'app/services/initializer.service';
import { ListCountryStateCityService } from '../../list-country-state-city.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import CountryDTO from 'app/interfaces/country-DTO';

@Component({
  selector: 'app-add-state',
  templateUrl: './add-state.component.html',
  styleUrls: ['./add-state.component.css']
})
export class AddStateComponent implements OnInit{
  
  @Input() availableCountries: CountryDTO[] = [] ;
  @Input() availableStates: StateDTO[]=[];
  @Output() reloadComponent= new EventEmitter<void>();
  private state: StateDTO= this.initializer.createStateDTO;
  private uniqueCode:string = "";
  private selectedCode: string="";
  stateForm!:FormGroup;
  

  constructor(
    private initializer: InitializerService,
    private listCountryStateCityService: ListCountryStateCityService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.uniqueCode= this.listCountryStateCityService.generateUniqueNumber(this.availableStates);
    this.stateForm = new FormGroup({
      code: new FormControl(this.uniqueCode, Validators.required),
      name: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required)
    });
  }

  onAdd(){
    this.mapFormtoDTO();
    this.listCountryStateCityService.addState(this.state).subscribe({
      next:(response)=>{
        this.showMessage("State added successfully.", 4000);
      },
      error:(err)=>{
        this.showMessage(err.message, 4000);
      }
    });
    this.reloadComponent.emit();
    this.resetForm();
  }

  onCountry(code: string){
    this.selectedCode= code;
  }

    private mapFormtoDTO(){
      if (this.stateForm.valid) {
        this.state.code = this.uniqueCode;
        this.state.name = this.stateForm.value.name!;
       this.state.countryCode= this.selectedCode;
      }
      
    }
  
    private showMessage(message: string, duration: number): void {
      this.snackBar.open(message, 'Dismiss', {
        duration: duration,
      });
    }

    resetForm(){
      this.stateForm.reset();
  
      Object.keys(this.stateForm.controls).forEach(key => {
        const control = this.stateForm.get(key);
        control?.setValidators(null);
        control?.setErrors(null);
        control?.updateValueAndValidity();
      });
    }
}

