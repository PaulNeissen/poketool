import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModeService {

  public mode = 0;

  constructor() { }

  getTeamSize() {
    return 3 + 3 * this.mode;
  }
}
