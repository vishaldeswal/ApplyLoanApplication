import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import UserCollateralDTO from 'app/interfaces/user-collateral-DTO';
import { EndpointsService } from 'app/services/endpoints.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollateralService {

  constructor(private http: HttpClient, private endpoint: EndpointsService) { }

  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  });
  public RemoveACollateralByUser(collateralId: string): Observable<string> {
    const urlWithParams = `${this.endpoint.deleteUserCollateral}?id=${encodeURIComponent(collateralId)}`;
    return this.http.delete<string>(urlWithParams,
      { headers: this.headers }).pipe(
        catchError(error => {
          console.error(error);
          throw error;
        })
      );
  }
}
