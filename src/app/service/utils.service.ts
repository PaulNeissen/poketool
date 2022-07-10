import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  reduce(arr, value) {
    let result: number[] = [];
    for(let i = 0; i < 18; i++) {
      if (arr[i] === value) {
        result.push(i);
      }
    }
    return result;
  }
}
