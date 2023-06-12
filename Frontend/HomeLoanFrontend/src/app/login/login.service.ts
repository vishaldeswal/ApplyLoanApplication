import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, catchError } from 'rxjs';
import LoginDTO from 'app/interfaces/login-DTO';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpClient: HttpClient) { }
  private headers: HttpHeaders = new HttpHeaders();
  public setHeaders(loginDTO: LoginDTO): HttpHeaders {
    this.headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'emailId': `${loginDTO.emailId}`,
        'password': `${loginDTO.password}`
      }
    )
    return this.headers;
  }
  public login(loginDTO: LoginDTO, url: string): Observable<string> {
    return this.httpClient.get(url, { headers: this.setHeaders(loginDTO), responseType: 'text' })
      .pipe(
        catchError(error => {
          console.error(error);
          throw error;
        }));
  }
}