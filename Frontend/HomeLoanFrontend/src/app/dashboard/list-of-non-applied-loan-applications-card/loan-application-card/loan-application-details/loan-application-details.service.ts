import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlSegment } from '@angular/router';
import AdvisorLoanApplicationDTO from 'app/interfaces/advisor-loan-application-DTO';
import ApplyLoanApplicationDTO from 'app/interfaces/apply-loan-application-DTO';
import UserLoanApplicationDTO from 'app/interfaces/user-loan-application-DTO';
import { EndpointsService } from 'app/services/endpoints.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanApplicationDetailsService {

  constructor(private http: HttpClient, private endpoints: EndpointsService) { }
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  });

  FetchLoanApplicationByUser(): Observable<UserLoanApplicationDTO> {
    const urlWithParams = `${this.endpoints.loanApplicationDetailsByUser}?applicationId=${encodeURIComponent(localStorage.getItem("loanApplicationId")!)}`;
    return this.http.get<UserLoanApplicationDTO>(urlWithParams, { headers: this.headers }).pipe(
      catchError(error => {
        console.error(error);
        throw error;
      })
    );
  }
  FetchLoanApplicationByAdvisor(): Observable<AdvisorLoanApplicationDTO> {
    const urlWithParams = `${this.endpoints.loanApplicationDetailsByAdvisor}?applicationId=${encodeURIComponent(localStorage.getItem("loanApplicationId")!)}`;
    return this.http.get<AdvisorLoanApplicationDTO>(urlWithParams, { headers: this.headers }).pipe(
      catchError(error => {
        console.error(error);
        throw error;
      })
    );
  }
}
