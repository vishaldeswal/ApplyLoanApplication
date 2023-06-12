import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CreateCollateralDTO from 'app/interfaces/create-collateral-dto';
import { EndpointsService } from 'app/services/endpoints.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateCollateralService {

  constructor(
    private http: HttpClient,
    private endpoints: EndpointsService
  ) { }

  createCollateral(createCollateralDTO: CreateCollateralDTO): Observable<string> {
    return this.http.post(this.endpoints.collateralEndpoint, createCollateralDTO, {
      responseType: 'text'
    })
  }
}
