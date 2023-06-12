import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import UserCollateralDTO from 'app/interfaces/user-collateral-DTO';
import { InitializerService } from 'app/services/initializer.service';
import { CollateralService } from './collateral.service';

@Component({
  selector: 'app-collateral',
  templateUrl: './collateral.component.html',
  styleUrls: ['./collateral.component.css']
})
export class CollateralComponent {
  constructor(private initializer: InitializerService, private router: Router, private collateralService: CollateralService) {

  }
  @Input() collateral: UserCollateralDTO = this.initializer.advisorLoanApplicationDTO;
  @Input() index: number = 0;
  checkRole(): number {
    if (localStorage.getItem("role") == "user") {
      return 0;
    }
    else {
      return 1;
    }
  }
  OnEdit(): void {
    this.router.navigate(['Dashboard/edit-collateral'], { queryParams: { id: this.collateral.id } })
  }
  OnRemove(): void {
    this.collateralService.RemoveACollateralByUser(this.collateral.id).subscribe(
      (data) => {
        alert(data);
      }
    );
  }
}
