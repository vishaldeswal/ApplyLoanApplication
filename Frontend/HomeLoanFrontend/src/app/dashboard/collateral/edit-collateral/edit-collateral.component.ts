import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CollateralDTO } from 'app/interfaces/collateral-DTO';
import { EditCollateralDTO } from 'app/interfaces/edit-collateral-dto';
import { InitializerService } from 'app/services/initializer.service';
import { map } from 'rxjs';
import { CollateralService } from '../collateral.service';
import { EditCollateralService } from '../edit-collateral.service';

@Component({
  selector: 'app-edit-collateral',
  templateUrl: './edit-collateral.component.html',
  styleUrls: ['./edit-collateral.component.css']
})
export class EditCollateralComponent {
  updateCollateral: FormGroup = new FormGroup({});
  id: string = '';
  collaterals: CollateralDTO[] = [];
  collateralType: string = '';
  collateralValue: number = 0;
  collateralShare: number = 0;
  editCollateralDTO: EditCollateralDTO = this.initializer.editCollateralDTO;
  constructor(
    private formBuilder: FormBuilder,
    private initializer: InitializerService,
    private editCollateralService: EditCollateralService,
    private snackBar: MatSnackBar,
    private router: Router,
    private collateralService: CollateralService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe({
      next: (params) => {
        this.id = params['id'];
      }
    })
  }
  ngOnInit(): void {
    this.updateCollateral = this.formBuilder.group({
      type: [{ value: '', disabled: true }, [Validators.required]],
      value: ['', [Validators.required, Validators.min(1000), Validators.max(990000000), Validators.pattern('^\\d*\\.?\\d+$')]],
      share: ['', [Validators.required, Validators.min(1), Validators.max(100), Validators.pattern('^\\d*\\.?\\d+$')]]
    });

    this.collateralService
      .getCollateralList()
      .pipe(
        map(collateralList => collateralList.filter(collateral => collateral.id === this.id))
      )
      .subscribe({
        next: (response) => {
          this.updateCollateral.patchValue({
            type: response[0]?.type,
            value: response[0]?.value,
            share: response[0]?.share
          });
        }
      });
  }


  UpdateCollateral() {
    if (this.updateCollateral.valid) {
      this.formDtoConversion();
      this.editCollateralService.editCollateral(this.editCollateralDTO).subscribe({
        next: (response: any) => {
          setTimeout(() => {
            console.log(response);
            
            this.showMessage('Updated Collateral successfully!', 3000);
          }, 1500);
          this.router.navigateByUrl('/Dashboard/ListOfCollaterals');

        },
        error: () => {
          this.showMessage('Failed to create. Please try again!', 3000);
        }
      })
    }
  }

  private formDtoConversion() {
    this.editCollateralDTO.value = Number(this.updateCollateral.value.value);
    this.editCollateralDTO.share = Number(this.updateCollateral.value.share);
    this.editCollateralDTO.id = this.id;
  }

  private showMessage(message: string, duration: number): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: duration,
    });
  }

  get type() {
    return this.updateCollateral.get('type');
  }

  get value() {
    return this.updateCollateral.get('value');
  }

  get share() {
    return this.updateCollateral.get('share');
  }
}
