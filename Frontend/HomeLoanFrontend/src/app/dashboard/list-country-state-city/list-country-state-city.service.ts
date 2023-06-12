import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { EndpointsService } from 'app/services/endpoints.service';
import CountryDTO from 'app/interfaces/country-DTO';
import StateDTO from 'app/interfaces/state-DTO';
import CityDTO from 'app/interfaces/city-DTO';

@Injectable({
  providedIn: 'root'
})
export class ListCountryStateCityService {

  constructor(private httpClient: HttpClient, private endpoints: EndpointsService) { }

  public getAllCountries(): Observable<CountryDTO[]> {
    return this.httpClient.get<CountryDTO[]>(this.endpoints.allCountries).pipe(
      catchError(error => {
        console.error(error);
        throw error;
      })
    );
  }

  public getAllStates(): Observable<StateDTO[]> {
    return this.httpClient.get<StateDTO[]>(this.endpoints.allStates).pipe(
      catchError(error => {
        console.error(error);
        throw error;
      })
    );
  }
  public getAllCities(): Observable<CityDTO[]> {
    return this.httpClient.get<CityDTO[]>(this.endpoints.allCities).pipe(
      catchError(error => {
        console.error(error);
        throw error;
      })
    );
  }

  public getStatesOf(countryName: string): Observable<StateDTO[]> {
    const urlWithParams = `${this.endpoints.allStates}?countryName=${encodeURIComponent(countryName)}`;
    return this.httpClient.get<StateDTO[]>(urlWithParams).pipe(
      catchError(error => {
        console.error(error);
        throw error;
      })
    );
  }
  public getCitiesOf(stateName: string, countryName: string): Observable<CityDTO[]> {
    const urlWithParams = `${this.endpoints.allCities}?countryName=${encodeURIComponent(countryName)}&stateName=${encodeURIComponent(stateName)}`;
    return this.httpClient.get<CityDTO[]>(urlWithParams).pipe(
      catchError(error => {
        console.error(error);
        if(error.status == 400){
          throw error('No city found, state or country is invalid.');
        }
        throw error;
      })
    );
  }
  public addCountry(country: CountryDTO): Observable<string> {
    
    const responseBody={code: country.code, name: country.name};
    return this.httpClient.post(this.endpoints.addCountry,
      responseBody,
       { responseType: 'text'}
       ).pipe(
        catchError(error => {
          console.error(error);
          if (error.status == 400) {
          throw error(`Insertion Abort, country with this code already exist invalid.`);
          }
          throw error;
        })
      );
  }

  public addState(state: StateDTO): Observable<string> {
    const responseBody={code: state.code, name: state.name, countryCode: state.countryCode};
    return this.httpClient.post(
      this.endpoints.addState,
      responseBody,
       { responseType: 'text' }
       ).pipe(
        catchError(error => {
          console.error(error);
          if (error.status == 400) {
           throw error(`Insertion Abort, state with this code already exist invalid.`);
          }
          throw error;
        })
      );
  }

  public addCity(city: CityDTO): Observable<string> {
    const responseBody={code: city.code, name: city.name, stateCode: city.stateCode};
    return this.httpClient.post(
      this.endpoints.addCity,
      responseBody,
      { responseType: 'text' }
      ).pipe(
        catchError(error => {
          console.error(error);
          if (error.status == 400) {
           throw error(`Insertion Abort, city with this code already exist invalid.`);
          }
          throw error;
        })
      );
  }

  public editCountry(country: CountryDTO): Observable<string> {
    return this.httpClient.patch(this.endpoints.editCountry,
      country,
       { responseType: 'text'}
       ).pipe(
        catchError(error => {
          console.error(error);
          if (error.status == 500) {
            throw error(`Updation Abort, No country found with ID=${country.id}.`);
          }
          throw error;
        })
      );
  }

  public editState(state: StateDTO): Observable<string> {
    return this.httpClient.patch(
      this.endpoints.editState,
      state,
       { responseType: 'text' }
       ).pipe(
        catchError(error => {
          console.error(error);
          if (error.status == 500) {
           throw error(`Updation Abort, No state found with ID=${state.id}.`);
          }
          throw error;
        })
      );
  }

  public editCity(city: CityDTO): Observable<string> {
    return this.httpClient.patch(
      this.endpoints.editCity,
      city,
      { responseType: 'text' }
      ).pipe(
        catchError(error => {
          console.error(error);
          if (error.status == 500) {
           throw error(`Updation Abort, No city found with ID=${city.id}.`);
          }
          throw error;
        })
      );
  }

  public deleteCountry(countryID: string):Observable<string>{
    const urlWithParams = `${this.endpoints.deleteCountry}?Id=${countryID}`;
    return this.httpClient.delete(urlWithParams,{responseType:'text'})
    .pipe(
      catchError(error => {
        console.error(error);
        if(error.status== 500){
          throw error(`Deletion Abort, No country found with ID=${countryID}.`);
        }
        throw error;
      })
    );
  }

  public deleteState(stateId: string):Observable<string>{
     const urlWithParams = `${this.endpoints.deleteState}?Id=${stateId}`;
    return this.httpClient.delete(urlWithParams,{responseType:'text'})
    .pipe(
      catchError(error => {
        console.error(error);
        if(error.status== 500){
          throw error(`Deletion Abort, No state found with ID=${stateId}.`);
        }
        throw error;
      })
    );
  }

  public deleteCity(cityId: string):Observable<string>{
    const urlWithParams = `${this.endpoints.deleteCity}?Id=${cityId}`;
    return this.httpClient.delete(urlWithParams,{responseType:'text'})
    .pipe(
      catchError(error => {
        console.error(error);
        if(error.status== 500){
          throw error(`Deletion Abort, No city found with ID=${cityId}.`);
        }
        throw error;
      })
    );
  }

  public generateUniqueNumber(existingCodes: CountryDTO[] | StateDTO[] | CityDTO[]): string {
    let number: string;
    let isUnique: boolean;

    do {
      const randomNumber = Math.floor(Math.random() * 990) + 10;
      number = randomNumber.toString();
      isUnique = !existingCodes.some((location) => location.code === number);
    } while (!isUnique);

    return number;
  }
}
