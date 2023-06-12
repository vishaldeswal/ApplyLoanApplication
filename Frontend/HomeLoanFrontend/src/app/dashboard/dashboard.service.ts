import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import UserLoanApplicationDTO from '../interfaces/user-loan-application-DTO';
import { EndpointsService } from '../services/endpoints.service';
import AdvisorLoanApplicationDTO from 'app/interfaces/advisor-loan-application-DTO';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


}
