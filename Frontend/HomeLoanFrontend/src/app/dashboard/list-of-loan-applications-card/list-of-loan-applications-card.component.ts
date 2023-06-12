import { Component, OnInit } from '@angular/core';
import UserLoanApplicationDTO from 'app/interfaces/user-loan-application-DTO';
import AdvisorLoanApplicationDTO from 'app/interfaces/advisor-loan-application-DTO';
import { ListOfLoanApplicationsCardService } from './list-of-loan-applications-card.service';

@Component({
  selector: 'app-list-of-loan-applications-card',
  templateUrl: './list-of-loan-applications-card.component.html',
  styleUrls: ['./list-of-loan-applications-card.component.css']
})
export class ListOfLoanApplicationsCardComponent implements OnInit {
  public listOfLoanApplicationDetailsByUser: UserLoanApplicationDTO[] = [];
  public listOfLoanApplicationDetailsByAdvisor: AdvisorLoanApplicationDTO[] = [];
  errorMessage: string = "";
  errorStatus: boolean = false;

  constructor(private listOfLoanApplicationCardService: ListOfLoanApplicationsCardService) {
    this.errorMessage = "";
    this.errorStatus = false;
    if (localStorage.getItem('role') == "user") {
      this.listOfLoanApplicationCardService.GetAllLoanApplicationByUser().subscribe({
        next: (response: UserLoanApplicationDTO[]) => {
          this.listOfLoanApplicationDetailsByUser = response;
          if (response.length == 0) {
            this.errorMessage = "No user loan application found";
            this.errorStatus = true;
          }
        },
        error: (error: any) => {
          this.errorMessage = "No user loan application found";
          this.errorStatus = true;
        }
      });
    }
    else {
      this.listOfLoanApplicationCardService.GetAllAppliedLoanApplicationByAdvisor().subscribe({
        next: (response: AdvisorLoanApplicationDTO[]) => {
          this.listOfLoanApplicationDetailsByAdvisor = response;
        },
        error: (error: any) => {
          this.errorMessage = "No open application found";
          this.errorStatus = true;
        }
      });
    }
  }
  checkRole(): number {
    if (localStorage.getItem("role") == "user") {
      return 0;
    }
    else {
      return 1;
    }
  }
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
  // updateApplicationStatus(status: string) {
  //   if (localStorage.getItem('role') == 'user') {
  //     this.listOfLoanApplicationDetailsByUser.forEach((application) => {
  //       application.status = status;
  //     });
  //   } 
  // }
  updateApplicationStatus(index: number, status: string) {
    // Update the application status in the corresponding array
    if (localStorage.getItem('role') == 'user') {
      this.listOfLoanApplicationDetailsByUser[index].status = status;
    } else {
      this.listOfLoanApplicationDetailsByAdvisor[index].status = status;
    }
  }
}

