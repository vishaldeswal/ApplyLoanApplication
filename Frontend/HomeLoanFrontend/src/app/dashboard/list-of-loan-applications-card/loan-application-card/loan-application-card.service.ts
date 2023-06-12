import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsService } from 'app/services/endpoints.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanApplicationCardService {

  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  });
  constructor(private endPointService: EndpointsService, private http: HttpClient) { }
  changeApplicationStatusFromCreatedToAppliedByUserTask(applicationId: string) {
    return this.http.patch(`${this.endPointService.changeLoanApplicationStatusByUser}?applicationId=${applicationId}`, {}, { responseType: 'text' });
  }
  public ChangeApplicationStatusByAdvisor(applicationId: string, status: string): Observable<string> {
    const urlWithParams = `${this.endPointService.changeApplicationStatusByAdvisor}?id=${encodeURIComponent(applicationId)}&status=${encodeURIComponent(status)}`;
    return this.http.patch(urlWithParams, null, { headers: this.headers, responseType: 'text' });
  }

  // changePasswordApi(updatePasswordDTO: UpdatePasswordDTO, url: string) {
  //   let headers = new HttpHeaders({
  //     Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  //   });
  //   return this.http.patch(url, updatePasswordDTO, {
  //     headers: headers,
  //     responseType: 'text'
  //   });
  //}
}
