import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModeService } from '../service/mode.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {

  sources = ["assets/logo/logo-go.png", "assets/logo/logo-pokemon.png"];

  constructor(
    private route: Router,
    private modeService: ModeService
  ) { }

  ngOnInit(): void {
  }

  goToSearch() {
    this.route.navigate(['/search']);
  }

  changeMode() {
    this.modeService.mode = 1 - this.modeService.mode;
  }

  getMode() {
    return this.modeService.mode;
  }
}
