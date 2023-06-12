import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CollateralDTO } from 'app/interfaces/collateral-DTO';
import { LinkCollateralDTO } from 'app/interfaces/link-collateral-DTO';
import { EndpointsService } from 'app/services/endpoints.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CollateralService {

  constructor(private http:HttpClient,private endPointService:EndpointsService) { }
  getCollateralList():Observable<CollateralDTO[]>{
    return this.http.get<CollateralDTO[]>(this.endPointService.collateralList);
  }
  linkCollateralToLoan(linkCollateralDTO:LinkCollateralDTO){
    console.log(linkCollateralDTO);
    let queryData:string=`?collaterId=${linkCollateralDTO.collaterId}&applicationId=${linkCollateralDTO.applicationId}`;
    return this.http.post(this.endPointService.linkCollateral+queryData,{},{
      responseType: 'text'
    });
  }
}
