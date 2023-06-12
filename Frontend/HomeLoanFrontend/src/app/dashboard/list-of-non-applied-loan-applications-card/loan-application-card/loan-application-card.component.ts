import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import AdvisorLoanApplicationDTO from 'app/interfaces/advisor-loan-application-DTO';
import { InitializerService } from 'app/services/initializer.service';
@Component({
  selector: 'app-loan-application-card',
  templateUrl: './loan-application-card.component.html',
  styleUrls: ['./loan-application-card.component.css']
})
export class LoanApplicationCardComponent implements OnInit, OnChanges {
  constructor(private initializer: InitializerService, private router: Router) {

  }
  @Input() userLoanApplicationDetailsByAdvisor: AdvisorLoanApplicationDTO = this.initializer.advisorLoanApplicationDTO;
  @Input() index: number = 0;
  checkRole(): number {
    if (localStorage.getItem("role") == "user") {
      return 0;
    }
    else {
      return 1;
    }
  }
  OnDetails(): void {
    localStorage.setItem('loanApplicationId', this.userLoanApplicationDetailsByAdvisor.id);
    this.router.navigateByUrl("Dashboard/LoanApplicationDetails");
  }
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
}
