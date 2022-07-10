import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Pokemon } from '../model/pokemon.class';
import { Resistance } from '../model/resistance.class';
import { TypeService } from '../service/type.service';
import { UtilsService } from '../service/utils.service';

@Component({
  selector: 'app-side-bar-pokemon',
  templateUrl: './side-bar-pokemon.component.html',
  styleUrls: ['./side-bar-pokemon.component.less']
})
export class SideBarPokemonComponent implements OnInit {

  @Input() pokemon: Pokemon | undefined;
  @Output() close = new EventEmitter<any>();
  public resistances: Resistance[] = [];  // Immunity, very strong, strong, neutral, weak, very weak

  constructor(
    public typeService: TypeService,
    public utilsService: UtilsService
  ) { }

  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes.pokemon && changes.pokemon.currentValue) {
      this.resistances = this.typeService.getResistances(changes.pokemon.currentValue.types);
    }
  }

  closeDrawer() {
    this.close.emit();
  }

}
