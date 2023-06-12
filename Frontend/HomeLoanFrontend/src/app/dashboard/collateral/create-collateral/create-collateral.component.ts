import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import CreateCollateralDTO from 'app/interfaces/create-collateral-dto';
import { InitializerService } from 'app/services/initializer.service';
import { CreateCollateralService } from '../create-collateral.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-collateral',
  templateUrl: './create-collateral.component.html',
  styleUrls: ['./create-collateral.component.css']
})
export class CreateCollateralComponent {
  createCollateral: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private initializer: InitializerService,
    private createCollateralService: CreateCollateralService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }
  createCollateralDTO: CreateCollateralDTO = this.initializer.createCollateralDTO;
  ngOnInit(): void {

    this.createCollateral = this.formBuilder.group({
      type: ['', [Validators.required]],
      value: ['', [Validators.required, Validators.min(1000), Validators.max(990000000), Validators.pattern('^\\d*\\.?\\d+$')]],
      share: ['', [Validators.required, Validators.min(1), Validators.max(100), Validators.pattern('^\\d*\\.?\\d+$')]]
    });
  };

  CreateCollateral() {
    if (this.createCollateral.valid) {
      this.formDtoConversion();
      this.createCollateralService.createCollateral(this.createCollateralDTO).subscribe({
        next: (response: any) => {
          setTimeout(() => {
            this.showMessage('Created Collateral successfully!', 3000);
          }, 1500);
          this.router.navigateByUrl('/');

        },
        error: err => {
          this.showMessage('Failed to create. Please try again!', 3000);
        }
      })
    }
  }

  private formDtoConversion() {
    this.createCollateralDTO.value = Number(this.createCollateral.value.value);
    this.createCollateralDTO.share = Number(this.createCollateral.value.share);
    this.createCollateralDTO.type = this.createCollateral.value.type;
  }

  private showMessage(message: string, duration: number): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: duration,
    });
  }

  get type() {
    return this.createCollateral.get('type');
  }

  get value() {
    return this.createCollateral.get('value');
  }

  get share() {
    return this.createCollateral.get('share');
  }
}
