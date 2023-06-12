import { Pipe, PipeTransform } from '@angular/core';
import CountryDTO from 'app/interfaces/country-DTO';

@Pipe({
  name: 'countryName'
})
export class CountryNamePipe implements PipeTransform {
  
  transform(countryCode: string, countries: CountryDTO[]): string {
    const country = countries.find(c => c.code === countryCode);
    return country ? country.name : '';
  }

}
