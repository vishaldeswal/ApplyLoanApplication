import { Component, OnInit } from '@angular/core';
import UserLoanApplicationDTO from '../interfaces/user-loan-application-DTO';
import { DashboardService } from './dashboard.service';
import AdvisorLoanApplicationDTO from 'app/interfaces/advisor-loan-application-DTO';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {

  }
}
