import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EndpointsService } from 'app/services/endpoints.service';
import RegisterUserDTO from 'app/interfaces/register-user-DTO';
import { Observable, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private httpClient: HttpClient, private endpoints: EndpointsService) { }
  public regitserUser(user: RegisterUserDTO): Observable<boolean> {
    return this.httpClient.post<boolean>(this.endpoints.userRegister, user);
  }
  
}
