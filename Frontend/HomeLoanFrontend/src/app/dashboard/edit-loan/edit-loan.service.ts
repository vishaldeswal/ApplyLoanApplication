import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EditLoanDTO } from 'app/interfaces/edit-loan-dto';
import { EndpointsService } from 'app/services/endpoints.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditLoanService {

  constructor(
    private http: HttpClient,
    private endpoints: EndpointsService
  ) { }

  editLoan(editLoanDTO: EditLoanDTO): Observable<String> {
    return this.http.patch(this.endpoints.loanEndpoints, editLoanDTO, {
      responseType: 'text'
    });
  }
}
