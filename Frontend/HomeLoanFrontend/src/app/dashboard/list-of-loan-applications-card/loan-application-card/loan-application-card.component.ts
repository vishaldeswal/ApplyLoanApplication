import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CollateralDialogComponent } from 'app/dashboard/collateral/collateral-dialog/collateral-dialog.component';
import { CollateralService } from 'app/dashboard/collateral/collateral.service';
import AdvisorLoanApplicationDTO from 'app/interfaces/advisor-loan-application-DTO';
import { CollateralDTO } from 'app/interfaces/collateral-DTO';
import { LinkCollateralDTO } from 'app/interfaces/link-collateral-DTO';
import UserLoanApplicationDTO from 'app/interfaces/user-loan-application-DTO';
import { InitializerService } from 'app/services/initializer.service';
import { LoanApplicationCardService } from './loan-application-card.service';
@Component({
  selector: 'app-loan-application-card',
  templateUrl: './loan-application-card.component.html',
  styleUrls: ['./loan-application-card.component.css'],
})
export class LoanApplicationCardComponent implements OnInit, OnChanges {
  applicationStatus: string = '';
  constructor(
    private initializer: InitializerService,
    private router: Router,
    private dialog: MatDialog,
    private collateralService: CollateralService,
    private loanApplicationCardService: LoanApplicationCardService,
    private changeDetectorRef: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) { }
  @Input() userLoanApplicationDetailsByUser: UserLoanApplicationDTO =
    this.initializer.userLoanApplicationDTO;
  @Input() userLoanApplicationDetailsByAdvisor: AdvisorLoanApplicationDTO =
    this.initializer.advisorLoanApplicationDTO;
  @Input() index: number = 0;
  checkRole(): number {
    if (localStorage.getItem('role') == 'user') {
      return 0;
    } else {
      return 1;
    }
  }

  public CheckStatusOfLoanApplicationByUser(): boolean {
    return this.applicationStatus == 'Created';
  }
  OnDetails(): void {
    if (localStorage.getItem('role') == 'user') {
      localStorage.setItem(
        'loanApplicationId',
        this.userLoanApplicationDetailsByUser.id
      );
    } else {
      localStorage.setItem(
        'loanApplicationId',
        this.userLoanApplicationDetailsByAdvisor.id
      );
    }
    this.router.navigateByUrl('Dashboard/LoanApplicationDetails');
  }
  ngOnInit(): void {
    this.applicationStatus = this.userLoanApplicationDetailsByUser.status;
  }
  ngOnChanges(changes: SimpleChanges): void { }
  openCollateralDialog() {
    const dialogRef = this.dialog.open(CollateralDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((selectedRow: CollateralDTO) => {
      if (selectedRow) {
        console.warn('Selected Row:', selectedRow);
        const linkCollateral: LinkCollateralDTO = {
          collaterId: selectedRow.id,
          applicationId: this.userLoanApplicationDetailsByUser.id,
        };
        this.linkCollateralAPICall(linkCollateral);
      }
    });
  }
  private linkCollateralAPICall(linkCollateral: LinkCollateralDTO) {
    this.collateralService.linkCollateralToLoan(linkCollateral).subscribe({
      next: (response) => {
        console.warn(response);
        this.changeLoanApplicationStatus(linkCollateral.applicationId);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  private changeLoanApplicationStatus(applicationId: string) {
    this.loanApplicationCardService
      .changeApplicationStatusFromCreatedToAppliedByUserTask(applicationId)
      .subscribe({
        next: (response) => {
          console.warn("In change application sttaus ");
          this.applicationStatus = 'Applied';
          this.resetInputProperties();
          this.showMessage('Application Applied!', 3000);
        },
        error: (err) => {
          console.warn(err)
          this.showMessage('Failed to Apply. Please try again.!', 3000);
        }
      });
  }

  public onEdit() {
    this.router.navigate(['Dashboard/edit-loan'], {
      queryParams: { id: this.userLoanApplicationDetailsByUser.id }
    })
  }
  private showMessage(message: string, duration: number): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: duration,
    });
  }
  private resetInputProperties() {
    this.userLoanApplicationDetailsByUser = { ...this.userLoanApplicationDetailsByUser };
    this.userLoanApplicationDetailsByAdvisor = { ...this.userLoanApplicationDetailsByAdvisor };
    this.userLoanApplicationDetailsByUser.status = 'Applied';
    this.index = this.index;
    this.changeDetectorRef.detectChanges();
  }
  OnAccept(): void {
    this.loanApplicationCardService.ChangeApplicationStatusByAdvisor(this.userLoanApplicationDetailsByAdvisor.id, "Accepted").subscribe(
      (data) => {
        this.showMessage("Status has been changed to accepted",3000);
        this.router.navigateByUrl('');
      }
    );
  }
  OnRecommend(): void {
    this.loanApplicationCardService.ChangeApplicationStatusByAdvisor(this.userLoanApplicationDetailsByAdvisor.id, "Recommended").subscribe(
      (data) => {
        this.showMessage("Status has been changed to recommended",3000);
        this.router.navigateByUrl('');
      }
    );
  }
  OnReject(): void {
    this.loanApplicationCardService.ChangeApplicationStatusByAdvisor(this.userLoanApplicationDetailsByAdvisor.id, "Rejected").subscribe(
      (data) => {
        this.showMessage("Status has been changed to rejected",3000);
        this.router.navigateByUrl('');
      }
    );
  }
}
