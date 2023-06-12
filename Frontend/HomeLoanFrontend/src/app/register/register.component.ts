import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import CountryDTO from 'app/interfaces/country-DTO';
import StateDTO from 'app/interfaces/state-DTO';
import CityDTO from 'app/interfaces/city-DTO';
import RegisterUserDTO from 'app/interfaces/register-user-DTO';
import { ListCountryStateCityService } from 'app/dashboard/list-country-state-city/list-country-state-city.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public availableCountries: CountryDTO[] = [];
  public availableStatesInCountry: StateDTO[] = [];
  public availableCityInState: CityDTO[] = [];
  registerForm: FormGroup = new FormGroup({});
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private registerService: RegisterService,
    private router: Router,
    private listCountryStateCityService: ListCountryStateCityService
  ) {}

  ngOnInit(): void {
    this.listCountryStateCityService.getAllCountries().subscribe((response) => {
      this.availableCountries = response;
      console.log(response);
    });

    this.registerForm = this.formBuilder.group({
      emailId: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{8,}$'
          ),
        ],
      ],
      mobileNumber: [
        null,
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
      country: [null, [Validators.required]],
      state: [null, [Validators.required]],
      city: [null, [Validators.required]],
    });
  }

  onCountryChange(countryValue: string) {
    this.listCountryStateCityService.getStatesOf(countryValue).subscribe((response) => {
      this.availableStatesInCountry = response;
      console.warn(this.availableStatesInCountry);
    });
  }
  onStateChange(stateValue: string) {
    const selectedCountry = this.registerForm.value.country;
    if (selectedCountry && stateValue) {
      this.listCountryStateCityService
        .getCitiesOf(stateValue, selectedCountry['name'])
        .subscribe((response) => {
          this.availableCityInState = response;
        });
    }
  }

  onSubmit() {
    const email: string = this.registerForm.value.emailId;
    const password: string = this.registerForm.value.password;
    const mobileNumber: string = this.registerForm.value.mobileNumber;
    const countryCode: string = this.registerForm.value.country['code'];
    const stateCode: string = this.registerForm.value.state['code'];
    const cityCode: string = this.registerForm.value.city['code'];

    const newUser: RegisterUserDTO = {
      emailId: email,
      password: password,
      mobileNumber: mobileNumber,
      countryCode: countryCode,
      stateCode: stateCode,
      cityCode: cityCode,
    };
    this.registerService.regitserUser(newUser).subscribe({
      next: (response) => {
          this.showMessage('User successfully registered!', 3000);
          this.router.navigateByUrl('');
      },
      error: (err) => {
        this.showMessage('Failed to register. Please try again.', 3000);
      },
    });
  }
  private showMessage(message: string, duration: number): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: duration,
    });
  }
}



