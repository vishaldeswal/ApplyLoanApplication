import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import CountryDTO from 'app/interfaces/country-DTO';
import StateDTO from 'app/interfaces/state-DTO';
import { InitializerService } from 'app/services/initializer.service';
import { ListCountryStateCityService } from '../../list-country-state-city.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-state',
  templateUrl: './edit-state.component.html',
  styleUrls: ['./edit-state.component.css']
})
export class EditStateComponent {
  @Input() availableCountries: CountryDTO[] = [] ;
  @Output() showAddState = new EventEmitter<boolean>();
  @Output() reloadComponent= new EventEmitter<void>();
  @Input() public state: StateDTO= this.initializer.createStateDTO;
  private selectedCode: string="";
  stateForm!:FormGroup;
  

  constructor(
    private initializer: InitializerService,
    private listCountryStateCityService: ListCountryStateCityService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    
    this.stateForm = new FormGroup({
      id: new FormControl(this.state.id, Validators.required),
      code: new FormControl(this.state.code, Validators.required),
      name: new FormControl(this.state.name, Validators.required),
      country: new FormControl(this.state, Validators.required)
    });
  }

  onEdit(){
    this.mapFormtoDTO();
    console.log(this.state);
    this.listCountryStateCityService.editState(this.state).subscribe({
      next:(response)=>{
        this.showMessage("State added successfully.", 4000);
      },
      error:(err)=>{
        this.showMessage(err.message, 4000);
      }
    });

    this.resetForm();
    this.insertBackAddState();
    this.reloadComponent.emit()
  }

  onCountry(code: string){
    this.selectedCode= code;
  }

    private mapFormtoDTO(){
      if (this.stateForm.valid) {
        this.state.name = this.stateForm.value.name!;
       this.state.countryCode= this.selectedCode;
      }
      
    }
  
    private showMessage(message: string, duration: number): void {
      this.snackBar.open(message, 'Dismiss', {
        duration: duration,
      });
    }
    public insertBackAddState(){
      this.showAddState.emit(true);
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
