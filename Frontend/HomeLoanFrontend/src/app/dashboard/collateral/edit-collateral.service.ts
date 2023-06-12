import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EditCollateralDTO } from 'app/interfaces/edit-collateral-dto';
import { EndpointsService } from 'app/services/endpoints.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class EditCollateralService {

  constructor(
    private http: HttpClient,
    private endpoints: EndpointsService
  ) { }

  editCollateral(editCollateralDTO: EditCollateralDTO): Observable<String> {
    return this.http.patch(this.endpoints.collateralEndpoint, editCollateralDTO, {
      responseType: 'text'
    })
  }
}
