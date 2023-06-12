import { Component } from '@angular/core';
import AdvisorLoanApplicationDTO from 'app/interfaces/advisor-loan-application-DTO';
import UserLoanApplicationDTO from 'app/interfaces/user-loan-application-DTO';
import { ListOfLoanApplicationsCardService } from '../list-of-loan-applications-card/list-of-loan-applications-card.service';
import { ListOfNonAppliedLoanApplicationsCardService } from './list-of-non-applied-loan-applications-card.service';

@Component({
  selector: 'app-list-of-non-applied-loan-applications-card',
  templateUrl: './list-of-non-applied-loan-applications-card.component.html',
  styleUrls: ['./list-of-non-applied-loan-applications-card.component.css']
})
export class ListOfNonAppliedLoanApplicationsCardComponent {
  errorMessage: string = "";
  errorStatus: boolean = false;
  constructor(private listOfLoanApplicationCardService: ListOfNonAppliedLoanApplicationsCardService) {
    this.errorMessage = "";
    this.errorStatus = false;
    this.listOfLoanApplicationCardService.GetAllNonAppliedLoanApplicationByAdvisor().subscribe({
      next: (response: AdvisorLoanApplicationDTO[]) => {
        this.listOfLoanApplicationDetailsByAdvisor = response;
      },
      error: (error: any) => {
        this.errorMessage = "No closed application found";
        this.errorStatus = true;
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
  public listOfLoanApplicationDetailsByAdvisor: AdvisorLoanApplicationDTO[] = [];
  CheckRole(): number {
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
