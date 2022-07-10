import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from '../model/pokemon.class';
import { PokemonService } from '../service/pokemon.service';

@Component({
  selector: 'app-team-builder',
  templateUrl: './team-builder.component.html',
  styleUrls: ['./team-builder.component.less']
})
export class TeamBuilderComponent implements OnInit {

  @Input() team!: Pokemon[];
  @Input() opened : boolean = false;
  @Output() remove = new EventEmitter<any>();

  items = ['leftovers', 'mega'];

  constructor(
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {

  }

  getImgStyle(pokemon) {
    const coord = this.pokemonService.getImgCoord(pokemon.id);
    const x = pokemon.id < 10000 ? Math.floor(pokemon.id / 12) : coord!.y;
    const y = pokemon.id < 10000 ? pokemon.id % 12 : coord!.x;
    const width =  x * 30;
    const height = y * 40;
    return "background:transparent url(../../assets/pokemonicons-sheet.png) no-repeat scroll -" 
      + height.toString() + "px -" + width.toString() + "px";
  }

  removePokemon(pokemon) {
    this.remove.emit(pokemon);
  }
}
