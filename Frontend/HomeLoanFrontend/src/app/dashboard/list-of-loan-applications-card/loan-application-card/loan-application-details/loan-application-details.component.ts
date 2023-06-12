import { Component, Input, OnInit } from '@angular/core';
import AdvisorLoanApplicationDTO from 'app/interfaces/advisor-loan-application-DTO';
import UserLoanApplicationDTO from 'app/interfaces/user-loan-application-DTO';
import { InitializerService } from 'app/services/initializer.service';
import { LoanApplicationDetailsService } from './loan-application-details.service';

@Component({
  selector: 'app-loan-application-details',
  templateUrl: './loan-application-details.component.html',
  styleUrls: ['./loan-application-details.component.css']
})
export class LoanApplicationDetailsComponent implements OnInit {
  constructor(private initializer: InitializerService, private loanApplicationDetailsService: LoanApplicationDetailsService) {

  }
  public loanApplicationDetailsByUser: UserLoanApplicationDTO = this.initializer.userLoanApplicationDTO;
  public loanApplicationDetailsByAdvisor: AdvisorLoanApplicationDTO = this.initializer.advisorLoanApplicationDTO;

  ngOnInit(): void {
    if (localStorage.getItem('role') == 'user') {
      this.loanApplicationDetailsService.FetchLoanApplicationByUser().subscribe((data) => {
        this.loanApplicationDetailsByUser = data;
      })
    }
    else {
      this.loanApplicationDetailsService.FetchLoanApplicationByAdvisor().subscribe((data) => {
        this.loanApplicationDetailsByAdvisor = data;
      })
    }
  }
  CheckRole(): number {
    if (localStorage.getItem('role') == 'user') {
      return 0;
    }
    else {
      return 1;
    }
  }
}
