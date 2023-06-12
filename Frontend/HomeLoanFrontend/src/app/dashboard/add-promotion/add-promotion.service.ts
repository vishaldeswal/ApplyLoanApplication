import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { EndpointsService } from 'app/services/endpoints.service';
import PromotionDTO from "app/interfaces/promotion-DTO";

@Injectable()
export class AddPromotionService{

    private headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
      });


    constructor(private http: HttpClient, private endpoints: EndpointsService) { }  
    
    submitNewPromotion(addPromotionDTO: PromotionDTO){
        console.log(addPromotionDTO);
        return this.http.post(this.endpoints.addPromotion, addPromotionDTO, {
            headers: this.headers,
            responseType: 'text'
          });
    }

}
