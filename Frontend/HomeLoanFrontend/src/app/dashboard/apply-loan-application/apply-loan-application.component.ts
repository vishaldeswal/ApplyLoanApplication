import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ApplyLoanApplicationService } from './apply-loan-application.service';
import { InitializerService } from 'app/services/initializer.service';
import ApplyLoanApplicationDTO from 'app/interfaces/apply-loan-application-DTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply-loan-application',
  templateUrl: './apply-loan-application.component.html',
  styleUrls: ['./apply-loan-application.component.css']
})
export class ApplyLoanApplicationComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private applyLoanApplicationService: ApplyLoanApplicationService,
    private initializer: InitializerService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
  }
  applyLoanDto: ApplyLoanApplicationDTO = this.initializer.applyLoanApplicationDTO;
  applyLoanForm: FormGroup = this.formBuilder.group({
    propertyAddress: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    propertySize: ['', [Validators.required, Validators.min(25), Validators.max(1000), Validators.pattern('^\\d*\\.?\\d+$')]],
    propertyCost: ['', [Validators.required, Validators.min(100000), Validators.max(900000000), this.multipleOf1000Validator, Validators.pattern('^\\d*\\.?\\d+$')]],
    registrationCost: ['', [Validators.required, Validators.min(100000), Validators.max(10000000), Validators.pattern('^\\d*\\.?\\d+$')]],
    monthlyFamilyIncome: ['', [Validators.required, Validators.min(1000), Validators.max(10000000), Validators.pattern('^\\d*\\.?\\d+$')]],
    otherIncome: ['', [Validators.required, Validators.min(1000), Validators.max(10000000), Validators.pattern('^\\d*\\.?\\d+$')]],
    loanAmount: ['', [Validators.required, Validators.min(10000), Validators.max(990000000), Validators.pattern('^\\d*\\.?\\d+$')]],
    loanDuration: ['', [Validators.required, Validators.min(12), Validators.max(240), Validators.pattern('^[0-9]+$')]]
  })


  ngOnInit(): void {
  }

  multipleOf1000Validator(control: AbstractControl) {
    const value = control.value;
    if (value > 100000 && value < 900000000 && value % 1000 !== 0) {
      return { multipleOf1000: true };
    }
    return false;
  }

  submitLoanRequest() {
    if (this.applyLoanForm.valid) {
      this.formDtoConversion();
      this.applyLoanApplicationService.postLoan(this.applyLoanDto).subscribe({
        next: (response: string) => {
          setTimeout(() => {
            this.showMessage('Loan application created successfully!', 3000);
          }, 1500);
          this.router.navigateByUrl('/');
        },
        error: err => {
          this.showMessage('Failed to create new application. Please try again!', 3000);
        },
      });

    }

  }

  private formDtoConversion() {
    this.applyLoanDto.address = this.applyLoanForm.value.propertyAddress;
    this.applyLoanDto.cost = Number(this.applyLoanForm.value.propertyCost);
    this.applyLoanDto.loanAmount = Number(this.applyLoanForm.value.loanAmount);
    this.applyLoanDto.loanDuration = Number(this.applyLoanForm.value.loanDuration);
    this.applyLoanDto.monthlyFamilyIncome = Number(this.applyLoanForm.value.monthlyFamilyIncome);
    this.applyLoanDto.otherIncome = Number(this.applyLoanForm.value.otherIncome);
    this.applyLoanDto.registrationCost = Number(this.applyLoanForm.value.registrationCost);
    this.applyLoanDto.size = Number(this.applyLoanForm.value.propertySize);
    this.applyLoanDto.loanStartDate = new Date();
  }

  private showMessage(message: string, duration: number): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: duration,
    });
  }

  get registrationCost() {
    return this.applyLoanForm.get('registrationCost');
  }
  get propertyAddress() {
    return this.applyLoanForm.get('propertyAddress');
  }
  get propertySize() {
    return this.applyLoanForm.get('propertySize');
  }
  get propertyCost() {
    return this.applyLoanForm.get('propertyCost');
  }
  get monthlyFamilyIncome() {
    return this.applyLoanForm.get('monthlyFamilyIncome');
  }
  get otherIncome() {
    return this.applyLoanForm.get('otherIncome');
  }
  get loanAmount() {
    return this.applyLoanForm.get('loanAmount');
  }
  get loanDuration() {
    return this.applyLoanForm.get('loanDuration');
  }
}
