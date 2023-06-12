import { Component } from '@angular/core';
import { UserListOfCollateralsService } from './user-list-of-collaterals.service';
import UserCollateralDTO from 'app/interfaces/user-collateral-DTO';

@Component({
  selector: 'app-user-list-of-collaterals',
  templateUrl: './user-list-of-collaterals.component.html',
  styleUrls: ['./user-list-of-collaterals.component.css']
})
export class UserListOfCollateralsComponent {
  public listOfUserCollaterals: UserCollateralDTO[] = [];

  constructor(private userListOfCollateralService: UserListOfCollateralsService) {
    this.userListOfCollateralService.GetAllCollateralsForUser().subscribe({
      next: (response: UserCollateralDTO[]) => {
        this.listOfUserCollaterals = response;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
  checkRole(): number {
    if (localStorage.getItem("role") == "user") {
      return 0;
    }
    else {
      return 1;
    }
  }
  ngOnInit(): void {

  }
}
