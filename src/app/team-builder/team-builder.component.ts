import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from '../model/pokemon.class';
import { ModeService } from '../service/mode.service';
import { PokemonService } from '../service/pokemon.service';
import { TypeService } from '../service/type.service';

@Component({
  selector: 'app-team-builder',
  templateUrl: './team-builder.component.html',
  styleUrls: ['./team-builder.component.less']
})
export class TeamBuilderComponent implements OnInit {

  @Input() team!: Pokemon[];
  @Input() opened : boolean = false;
  @Output() remove = new EventEmitter<any>();
  @Output() change = new EventEmitter<any>();

  items = ['leftovers', 'mega'];

  constructor(
    private pokemonService: PokemonService,
    private modeService: ModeService,
    private typeService: TypeService
  ) { }

  ngOnInit(): void {

  }

  // TODO : update localstorage after move change

  isPogo() {
    return this.modeService.mode == 0;
  }

  getImgStyle(pokemon) {
    const coord = this.pokemonService.getImgCoord(pokemon.id);
    const x = pokemon.id < 10000 ? Math.floor(pokemon.id / 12) : coord!.y;
    const y = pokemon.id < 10000 ? pokemon.id % 12 : coord!.x;
    const width =  x * 30;
    const height = y * 40;
    return "background:transparent url(assets/pokemonicons-sheet.png) no-repeat scroll -" 
      + height.toString() + "px -" + width.toString() + "px";
  }

  removePokemon(pokemon) {
    this.remove.emit(pokemon);
  }

  getMoveName(move) {
    return this.pokemonService.moveNames.get(move);
  }

  getMoveNameTrigger(index, pokemon) {
    return this.pokemonService.moveNames.get(pokemon.moveset[index]);
  }

  changeMove($event, i, pokemon) {
    this.change.emit(pokemon);
  }

  changeMovePogo($event, pokemon, index) {
    pokemon.moveset[index] = $event.value;
    this.change.emit(pokemon);
  }

  getTypeSrc(move, pokemon) {
    return this.typeService.getTypeImgFromId(this.getMoveType(move, pokemon));
  }

  getMoveType(move, pokemon) {
    return pokemon.weatherBallType >= 0 ? pokemon.weatherBallType : this.pokemonService.moves.find(x => x.id == move)?.type;
  }

  getTypeName(move, pokemon) {
    return this.typeService.types[this.getMoveType(move, pokemon)];
  }

  getTypeNameTrigger(index, pokemon) {
    return this.typeService.types[this.getMoveType(pokemon.moveset[index], pokemon)];
  }

  getMoves(pokemon, index) {
    return index == 0 ? pokemon.fastMoves : pokemon.chargedMoves;
  }
  
  removeMove(pokemon, index) {
    pokemon.moveset[index] = undefined;
    this.change.emit(pokemon);
  }
}
