import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import PromotionDTO from 'app/interfaces/promotion-DTO';
import { EndpointsService } from 'app/services/endpoints.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient, private endpoints: EndpointsService) { }

  Fetchpromotion(): Observable<PromotionDTO> {
    const url = this.endpoints.activePromtion;
    return this.http.get<PromotionDTO>(url).pipe(
      catchError(error => {
        console.error(error);
        throw error;
      })
    );
  }
}
