import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplyLoanApplicationService } from 'app/dashboard/apply-loan-application/apply-loan-application.service';
import { ListOfLoanApplicationsCardService } from 'app/dashboard/list-of-loan-applications-card/list-of-loan-applications-card.service';
import { EditLoanDTO } from 'app/interfaces/edit-loan-dto';
import { InitializerService } from 'app/services/initializer.service';
import { map } from 'rxjs';
import { EditLoanService } from './edit-loan.service';

@Component({
  selector: 'app-edit-loan',
  templateUrl: './edit-loan.component.html',
  styleUrls: ['./edit-loan.component.css']
})
export class EditLoanComponent {
  updateLoan: FormGroup = new FormGroup({});
  id: string = '';
  loans: EditLoanDTO[] = [];
  loanPropertyAddress: string = '';
  loanProperySize: number = 0;
  loanPropertyCost: number = 0;
  loanRegistrationCost: number = 0;
  monthlyIncome: number = 0;
  otherIncomeS: number = 0;
  reqAmount: number = 0;
  duration: number = 0;
  loanStartDate: any ;
  editLoanDTO: EditLoanDTO = this.initializer.editLoanDTO;

  constructor(
    private formBuilder: FormBuilder,
    private initializer: InitializerService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private loanListService: ListOfLoanApplicationsCardService,
    private editLoanService: EditLoanService
  ) {
    this.route.queryParams.subscribe({
      next: (params) => {
        this.id = params['id'];
      }
    })
  }

  ngOnInit(): void {
    this.updateLoan = this.formBuilder.group({
      propertyAddress: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      propertySize: ['', [Validators.required, Validators.min(25), Validators.max(1000), Validators.pattern('^\\d*\\.?\\d+$')]],
      propertyCost: ['', [Validators.required, Validators.min(100000), Validators.max(900000000), this.multipleOf1000Validator, Validators.pattern('^\\d*\\.?\\d+$')]],
      registrationCost: ['', [Validators.required, Validators.min(100000), Validators.max(10000000), Validators.pattern('^\\d*\\.?\\d+$')]],
      monthlyFamilyIncome: ['', [Validators.required, Validators.min(1000), Validators.max(10000000), Validators.pattern('^\\d*\\.?\\d+$')]],
      otherIncome: ['', [Validators.required, Validators.min(1000), Validators.max(10000000), Validators.pattern('^\\d*\\.?\\d+$')]],
      loanAmount: ['', [Validators.required, Validators.min(10000), Validators.max(990000000), Validators.pattern('^\\d*\\.?\\d+$')]],
      loanDuration: ['', [Validators.required, Validators.min(12), Validators.max(240), Validators.pattern('^[0-9]+$')]]
    
    })
    this.loanStartDate=new Date();
    this.loanListService
      .GetAllLoanApplicationByUser()
      .pipe(
        map(loanList => loanList.filter(loan => loan.id === this.id))
      )
      .subscribe({
        next: (response) => {
          
          this.updateLoan.patchValue({
            propertyAddress: response[0].address,
            propertySize: response[0].size,
            propertyCost: response[0].cost,
            registrationCost: response[0].registrationCost,
            monthlyFamilyIncome: response[0].monthlyFamilyIncome,
            otherIncome: response[0].otherIncome,
            loanAmount: response[0].loanAmount,
            loanDuration: response[0].loanDuration,
            // loanStartDate: response[0].loanStartDate
          })
        }
      })
  }

  multipleOf1000Validator(control: AbstractControl) {
    const value = control.value;
    if (value > 100000 && value < 900000000 && value % 1000 !== 0) {
      return { multipleOf1000: true };
    }
    return false;
  }

  editLoanRequest() {
    if (this.updateLoan.valid) {
      this.formDtoConversion();
      console.log(this.editLoanDTO);
      this.editLoanService.editLoan(this.editLoanDTO).subscribe({
        
        next: (response) => {
          setTimeout(() => {
            this.showMessage('Application updated successfully!', 3000);
          }, 1500);
          this.router.navigate(['/Dashboard']);
        },
        error: () => {
          this.showMessage('Something went wrong. Please try again!', 3000);
        }
      })
      // this.editLoanService.editLoan(this.editLoanDTO).subscribe({
      //   next: (response: string) => {
      //     setTimeout(() => {
      //       this.showMessage('Application updated successfully!', 3000);
      //     }, 1500);)
      //     this.router.navigateByUrl('/Dashboard');
      //   },
      //   error: err => {
      //     this.showMessage('Something went wrong. Please try again!', 3000);
      //   },
      // });

    }

  }

  private formDtoConversion() {
    this.editLoanDTO.id = this.id;
    this.editLoanDTO.address = this.updateLoan.value.propertyAddress;
    this.editLoanDTO.cost = Number(this.updateLoan.value.propertyCost);
    this.editLoanDTO.loanAmount = Number(this.updateLoan.value.loanAmount);
    this.editLoanDTO.loanDuration = Number(this.updateLoan.value.loanDuration);
    this.editLoanDTO.monthlyFamilyIncome = Number(this.updateLoan.value.monthlyFamilyIncome);
    this.editLoanDTO.otherIncome = Number(this.updateLoan.value.otherIncome);
    this.editLoanDTO.registrationCost = Number(this.updateLoan.value.registrationCost);
    this.editLoanDTO.size = Number(this.updateLoan.value.propertySize);
    this.editLoanDTO.loanStartDate = this.loanStartDate;
  }

  private showMessage(message: string, duration: number): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: duration,
    });
  }

  get registrationCost() {
    return this.updateLoan.get('registrationCost');
  }
  get propertyAddress() {
    return this.updateLoan.get('propertyAddress');
  }
  get propertySize() {
    return this.updateLoan.get('propertySize');
  }
  get propertyCost() {
    return this.updateLoan.get('propertyCost');
  }
  get monthlyFamilyIncome() {
    return this.updateLoan.get('monthlyFamilyIncome');
  }
  get otherIncome() {
    return this.updateLoan.get('otherIncome');
  }
  get loanAmount() {
    return this.updateLoan.get('loanAmount');
  }
  get loanDuration() {
    return this.updateLoan.get('loanDuration');
  }
}
