import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePasswordComponent } from './update-password.component';
import UpdatePasswordDTO from 'app/interfaces/update-password-DTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EndpointsService } from 'app/services/endpoints.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdatePasswordService {

  constructor(private dialog: MatDialog, private http: HttpClient, private endpoints: EndpointsService) { }
  openCardDialog(): void {
    this.dialog.open(UpdatePasswordComponent, {
      width: '450px',
      height: '390px',
      panelClass: 'card-dialog',
    });
  }
  changePasswordApi(updatePasswordDTO: UpdatePasswordDTO, url: string):Observable<string> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    });
    return this.http.patch(url, updatePasswordDTO, {
      headers: headers,
      responseType: 'text'
    });
  }
}
