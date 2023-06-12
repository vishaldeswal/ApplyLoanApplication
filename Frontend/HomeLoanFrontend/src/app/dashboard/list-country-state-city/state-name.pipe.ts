import { Pipe, PipeTransform } from '@angular/core';
import StateDTO from 'app/interfaces/state-DTO';

@Pipe({
  name: 'stateName'
})
export class StateNamePipe implements PipeTransform {

  transform(stateCode: string, states: StateDTO[]): string {
    const state = states.find(s => s.code === stateCode);
    return state ? state.name : '';
  }
}
