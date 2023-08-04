import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Pokemon } from '../model/pokemon.class';
import { Resistance } from '../model/resistance.class';
import { PokemonService } from '../service/pokemon.service';
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
  public evolutions: Pokemon[] = [];

  constructor(
    public typeService: TypeService,
    public utilsService: UtilsService,
    public pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes.pokemon && changes.pokemon.currentValue) {
      this.resistances = this.typeService.getResistances(changes.pokemon.currentValue.types);
      console.log('RESISTANCES', this.resistances);
      this.evolutions = this.pokemonService.pokemons.filter(x => x.evolveChain != 0 && x.evolveChain == changes.pokemon.currentValue.evolveChain).sort((a,b) => a.id < b.id ? -1 : 1);
    }
  }

  closeDrawer() {
    this.close.emit();
  }

  getImageId(id) {
    return this.pokemonService.getImageId(id);
  }

  changePokemon(pokemon) {
    this.pokemon = pokemon;
    this.resistances = this.typeService.getResistances(pokemon.types);
  }

  getTypeSrc(type) {
    return this.typeService.getTypeImgFromId(type);
  }
}
