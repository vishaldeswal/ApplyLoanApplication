import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import AdvisorLoanApplicationDTO from 'app/interfaces/advisor-loan-application-DTO';
import UserLoanApplicationDTO from 'app/interfaces/user-loan-application-DTO';
import { EndpointsService } from 'app/services/endpoints.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListOfLoanApplicationsCardService {

  constructor(private httpClient: HttpClient, private endpoints: EndpointsService, private router: Router) { }
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  });
  public GetAllLoanApplicationByUser(): Observable<UserLoanApplicationDTO[]> {
    return this.httpClient.get<UserLoanApplicationDTO[]>(this.endpoints.allLoanApplicationsForUserByUserEndpoint,
      { headers: this.headers }).pipe(
        catchError(error => {
          throw error;
        })
      );
  }
  public GetAllAppliedLoanApplicationByAdvisor(): Observable<AdvisorLoanApplicationDTO[]> {
    return this.httpClient.get<AdvisorLoanApplicationDTO[]>(this.endpoints.allAppliedLoanApplicationByAdvisor,
      { headers: this.headers }).pipe(
        catchError(error => {
          throw error;
        })
      );
  }
}
