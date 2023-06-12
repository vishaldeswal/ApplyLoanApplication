import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import ApplyLoanApplicationDTO from 'app/interfaces/apply-loan-application-DTO';
import { EndpointsService } from 'app/services/endpoints.service';

@Injectable({
  providedIn: 'root'
})


export class ApplyLoanApplicationService {
  constructor(private http: HttpClient, private endpoints: EndpointsService) { }

  postLoan(applyLoanDto: ApplyLoanApplicationDTO): Observable<string> {
    return this.http.post(this.endpoints.loanEndpoints, applyLoanDto, {

      responseType: 'text'
    });
  }
}
