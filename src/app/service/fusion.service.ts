import { Injectable } from '@angular/core';
import { Pokemon } from '../model/pokemon.class';

@Injectable({
  providedIn: 'root'
})
export class FusionService {

  private swapTypePokemons = [81, 82, 87, 138, 139, 212, 462, 395, 442, 598, 251];

  //private dominantTypePokemons = [1, 2, 3, 6, 74, 75, 76, 92, 93, 94, 95, 123, 130, 144, 145, 146, 149, 208];

  private dominantTypeMap = {1:11, 2:11, 3:11, 6:9, 74:5, 75:5, 76:5, 92:7, 93:7, 94:7, 95:5, 123:6, 130:10, 144:14, 145:12, 146:9, 149:15, 208:8}
  // TODO : all Normal/Flying are flying dominant

  constructor() { }

  getTypes(pokemon) {
    if (this.swapTypePokemons.includes(pokemon.id)) { // Swapped types
      return pokemon.types.reverse(); 
    } else if (pokemon.id in this.dominantTypeMap) { // Dominant type
      return [this.dominantTypeMap[pokemon.id]];
    } else if (pokemon.types > 1 && pokemon.types[0] == 0 && pokemon.types[0] == 2) { // Dominant type for Normal/Flying
      return [2]; // Flying type
    } else {
      return pokemon.types;
    }
  }

  fuse(head, body) {
    // ID, NAME, SPECIE
    let fusion = new Pokemon(420*head.id + body.id, head.name + "/" + body.name, head.id + "." + body.id);

    // TYPE
    let headType = this.getTypes(head);
    let bodyType = this.getTypes(body);
    let types = [headType[0]];
    if (bodyType.length == 2) {
      if (headType[0] != bodyType[1]) {
        types.push(bodyType[1]);
      } else {
        types.push(bodyType[0]);
      }
    } else {
      if (headType[0] != bodyType[0]) {
        types.push(bodyType[0]);
      }
    }
    fusion.types = types;


    // STAT
    let fuseStat = (stat1, stat2) => Math.floor(2* stat1 / 3 + stat2 / 3);
    fusion.hp = fuseStat(head.hp, body.hp);
    fusion.atk = fuseStat(body.atk, head.atk);
    fusion.def = fuseStat(body.def, head.def);
    fusion.spAtk = fuseStat(head.spAtk, body.spAtk);
    fusion.spDef = fuseStat(head.spDef, body.spDef);
    fusion.speed = fuseStat(body.speed, head.speed);
    fusion.updateTotalStat();
    fusion.updateAltTotalStat();

    // MOVES

    // ABILITY

    // NATURE

    // EVs

    // IVs

    console.log("FUSION", fusion);
    return fusion;
  }
}
