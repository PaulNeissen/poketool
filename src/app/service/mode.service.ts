import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeService {

  public mode = 0 // POGO = 0, classic = 1
  private modeSubject = new BehaviorSubject(0);
  currentMode = this.modeSubject.asObservable();

  constructor() { }

  getTeamSize() {
    return 3 + 3 * this.mode;
  }

  changeMode() {
    this.mode = 1 - this.mode;
    this.modeSubject.next(this.mode);
  }

}
