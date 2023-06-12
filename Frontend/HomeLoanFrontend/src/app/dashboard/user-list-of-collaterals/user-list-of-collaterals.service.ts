import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AdvisorLoanApplicationDTO from 'app/interfaces/advisor-loan-application-DTO';
import UserCollateralDTO from 'app/interfaces/user-collateral-DTO';
import { EndpointsService } from 'app/services/endpoints.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserListOfCollateralsService {

  constructor(private httpClient: HttpClient, private endpoints: EndpointsService) { }
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  });
  public GetAllCollateralsForUser(): Observable<UserCollateralDTO[]> {
    return this.httpClient.get<UserCollateralDTO[]>(this.endpoints.userCollateralList,
      { headers: this.headers }).pipe(
        catchError(error => {
          console.error(error);
          throw error;
        })
      );
  }
}
