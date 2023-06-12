import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { InitializerService } from 'app/services/initializer.service';
import { AddPromotionService } from './add-promotion.service';
import  PromotionDTO from 'app/interfaces/promotion-DTO';

@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.css']
})

export class AddPromotionComponent implements OnInit {


  promotionTypes: string[] = this.initializer.createPromotionType;

  addPromotionDTO: PromotionDTO = this.initializer.createPromotionDTO;
  applyPromotionForm: FormGroup = this.formBuilder.group({
    startDate: [null, Validators.required, this.dateRangeValidator],
    endDate: [null, Validators.required],
    type: ['', [Validators.required]],
    message: ['', [Validators.required]]
  });




  constructor(
    private formBuilder: FormBuilder,
    private addPromotionService: AddPromotionService,
    private initializer: InitializerService,
    private snackBar: MatSnackBar,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {}

  submitPromotionRequest() {
    this.formValueToInterface();
    this.addPromotionService.submitNewPromotion(this.addPromotionDTO)
      .subscribe({
        next: (response) => {
          this.showMessage("Promotion successfully added", 4000);
        },
        error: (err) => {
          this.showMessage('Failed to add promotion. Please try again.', 4000);
          if (err.status == 401) {
          }
        }
      });

    this.resetForm();
    this.router.navigate(['Dashboard']);
  }

 




 async dateRangeValidator(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve) => {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Set time to 00:00:00

      const startDate = new Date(control.value);
      startDate.setHours(0, 0, 0, 0); // Set time to 00:00:00

      const futureDate = new Date(currentDate.getFullYear() + 5, currentDate.getMonth(), currentDate.getDate());
      futureDate.setHours(0, 0, 0, 0); // Set time to 00:00:00

      console.log("StartDate" + startDate + "\n ------ \n" + "Current Date" + currentDate);

      if (isNaN(startDate.getTime()) || startDate < currentDate || startDate > futureDate) {
        resolve({ dateRangeError: true });
      }
      resolve(null);
    })

  }


  formValueToInterface(){

    const startDate = new Date(this.applyPromotionForm.value.startDate);
    const endDate = new Date(this.applyPromotionForm.value.endDate);
    const formattedStartDate = this.datePipe.transform(startDate, 'yyyy-MM-dd');
    const formattedEndDate = this.datePipe.transform(endDate, 'yyyy-MM-dd');
    console.log("startDate:" + formattedStartDate + "\n---\nendate:" + formattedEndDate);

    this.addPromotionDTO.startDate = formattedStartDate!;
    this.addPromotionDTO.endDate = formattedEndDate!;
    this.addPromotionDTO.type = this.applyPromotionForm.value.type;
    this.addPromotionDTO.message = this.applyPromotionForm.value.message;
  }

  resetForm() {
    Object.keys(this.applyPromotionForm.controls).forEach(key => {
      const control = this.applyPromotionForm.get(key);
      control?.clearValidators();
      control?.updateValueAndValidity();
    });
    this.applyPromotionForm.reset();
  }

  private showMessage(message: string, duration: number): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: duration,
    });
  }

}