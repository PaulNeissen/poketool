import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Move } from '../model/move.class';
import { Pokemon } from '../model/pokemon.class';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private baseUrl = 'https://pokeapi.co/api/v2/'
  private tierListUrl = 'https://vps.gobattlelog.com/data/';
  private tierListParam = '.json?v=1.34.40';
  public limit = 1118; // max 1118
  public languageId = 5;
  public pokemons: Pokemon[] = [];
  public isInit: Subject<boolean> = new Subject<boolean>();
  public moveNames: Map<number, string> = new Map<number, string>();
  public moves: Move[] = [];


  public pikachus = [10080, 10081, 10082, 10083, 10084, 10085, 10094, 10095, 10096, 10097, 10098, 10099, 10148];
  public totems = [10093, 10121, 10122, 10128, 10129, 10144, 10145, 10146, 10149, 10150, 10153, 10154];
  public miniors = [10130, 10131, 10132, 10133, 10134, 10135, 10137, 10138, 10139, 10140, 10141, 10142];
  public greninjas = [10116];
  public gourgeists = [10027, 10028, 10029, 10030, 10031, 10032];
  public rockruff = [10151];
  public useless = this.pikachus.concat(this.totems).concat(this.miniors).concat(this.greninjas).concat(this.gourgeists)
    .concat(this.rockruff);

  public imgCoord = [
    {id: 10001, x: 2, y: 78},
    {id: 10002, x: 3, y: 78},
    {id: 10003, x: 4, y: 78},
    {id: 10004, x: 7, y: 78},
    {id: 10005, x: 8, y: 78},
    {id: 10006, x: 6, y: 79},
    {id: 10007, x: 5, y: 79},
    {id: 10008, x: 2, y: 79},
    {id: 10009, x: 4, y: 79},
    {id: 10010, x: 1, y: 79},
    {id: 10011, x: 0, y: 79},
    {id: 10012, x: 3, y: 79},
    {id: 10013, x: 1, y: 78},
    {id: 10014, x: 11, y: 77},
    {id: 10015, x: 0, y: 78},
    {id: 10016, x: 8, y: 79},
    {id: 10017, x: 10, y: 79},
    {id: 10018, x: 0, y: 81},
    {id: 10019, x: 6, y: 80},
    {id: 10020, x: 7, y: 80},
    {id: 10021, x: 8, y: 80},
    {id: 10022, x: 9, y: 80},
    {id: 10023, x: 10, y: 80},
    {id: 10024, x: 11, y: 80},
    {id: 10025, x: 7, y: 84},
    {id: 10026, x: 8, y: 84},
    {id: 10033, x: 0, y: 93},
    {id: 10034, x: 1, y: 93},
    {id: 10035, x: 2, y: 93},
    {id: 10036, x: 3, y: 93},
    {id: 10037, x: 6, y: 93},
    {id: 10038, x: 8, y: 93},
    {id: 10039, x: 9, y: 93},
    {id: 10040, x: 10, y: 93},
    {id: 10041, x: 11, y: 93},
    {id: 10042, x: 0, y: 94},
    {id: 10043, x: 1, y: 94},
    {id: 10044, x: 2, y: 94},
    {id: 10045, x: 3, y: 94},
    {id: 10046, x: 5, y: 94},
    {id: 10047, x: 6, y: 94},
    {id: 10048, x: 7, y: 94},
    {id: 10049, x: 8, y: 94},
    {id: 10050, x: 10, y: 94},
    {id: 10051, x: 0, y: 95},
    {id: 10052, x: 2, y: 95},
    {id: 10053, x: 3, y: 95},
    {id: 10054, x: 4, y: 95},
    {id: 10055, x: 5, y: 95},
    {id: 10056, x: 9, y: 95},
    {id: 10057, x: 10, y: 95},
    {id: 10058, x: 8, y: 96},
    {id: 10059, x: 9, y: 96},
    {id: 10060, x: 10, y: 96},
    {id: 10061, x: 2, y: 83},
    {id: 10062, x: 2, y: 96},
    {id: 10063, x: 3, y: 96},
    {id: 10064, x: 11, y: 94},
    {id: 10065, x: 9, y: 94},
    {id: 10066, x: 1, y: 95},
    {id: 10067, x: 8, y: 95},
    {id: 10068, x: 11, y: 96},
    {id: 10069, x: 0, y: 97},
    {id: 10070, x: 6, y: 95},
    {id: 10071, x: 7, y: 93},
    {id: 10072, x: 4, y: 94},
    {id: 10073, x: 5, y: 93},
    {id: 10074, x: 11, y: 95},
    {id: 10075, x: 1, y: 97},
    {id: 10076, x: 1, y: 96},
    {id: 10077, x: 4, y: 96},
    {id: 10078, x: 5, y: 96},
    {id: 10079, x: 6, y: 96},
    {id: 10086, x: 10, y: 84},
    {id: 10087, x: 7, y: 95},
    {id: 10088, x: 7, y: 97},
    {id: 10089, x: 0, y: 97},
    {id: 10090, x: 4, y: 93},
    {id: 10091, x: 11, y: 84},
    {id: 10092, x: 0, y: 85},
    {id: 10100, x: 1, y: 85},
    {id: 10101, x: 2, y: 85},
    {id: 10102, x: 3, y: 85},
    {id: 10103, x: 4, y: 85},
    {id: 10104, x: 5, y: 85},
    {id: 10105, x: 6, y: 85},
    {id: 10106, x: 7, y: 85},
    {id: 10107, x: 8, y: 85},
    {id: 10108, x: 9, y: 85},
    {id: 10109, x: 10, y: 85},
    {id: 10110, x: 11, y: 85},
    {id: 10111, x: 0, y: 86},
    {id: 10112, x: 1, y: 86},
    {id: 10113, x: 2, y: 86},
    {id: 10114, x: 3, y: 86},
    {id: 10115, x: 4, y: 86},
    {id: 10117, x: 5, y: 86},
    {id: 10118, x: 6, y: 86},
    {id: 10119, x: 10, y: 59},
    {id: 10120, x: 7, y: 86},
    {id: 10123, x: 8, y: 86},
    {id: 10124, x: 9, y: 86},
    {id: 10125, x: 10, y: 86},
    {id: 10126, x: 11, y: 86},
    {id: 10127, x: 0, y: 87},
    {id: 10130, x: 4, y: 107},
    {id: 10136, x: 5, y: 107},
    {id: 10143, x: 10, y: 64},
    {id: 10147, x: 8, y: 87},
    {id: 10152, x: 4, y: 88},
    {id: 10155, x: 5, y: 88},
    {id: 10156, x: 6, y: 88},
    {id: 10157, x: 7, y: 88},
    {id: 10158, x: 10, y: 88},
    {id: 10159, x: 11, y: 88},
    {id: 10160, x: 0, y: 89},
    {id: 10161, x: 4, y: 91},
    {id: 10162, x: 5, y: 91},
    {id: 10163, x: 1, y: 89},
    {id: 10164, x: 2, y: 89},
    {id: 10165, x: 3, y: 89},
    {id: 10166, x: 8, y: 91},
    {id: 10167, x: 9, y: 91},
    {id: 10168, x: 10, y: 91},
    {id: 10169, x: 11, y: 91},
    {id: 10170, x: 4, y: 89},
    {id: 10171, x: 5, y: 89},
    {id: 10172, x: 6, y: 89},
    {id: 10173, x: 7, y: 89},
    {id: 10174, x: 8, y: 89},
    {id: 10175, x: 9, y: 89},
    {id: 10176, x: 10, y: 89},
    {id: 10177, x: 11, y: 89},
    {id: 10178, x: 2, y: 90},
    {id: 10179, x: 11, y: 90},
    {id: 10180, x: 0, y: 91},
    {id: 10181, x: 2, y: 91},
    {id: 10182, x: 3, y: 91},
    {id: 10183, x: 4, y: 74},
    {id: 10184, x: 0, y: 92},
    {id: 10185, x: 1, y: 92},
    {id: 10186, x: 5, y: 99},
    {id: 10187, x: 2, y: 97},
    {id: 10188, x: 6, y: 99},
    {id: 10189, x: 3, y: 97},
    {id: 10190, x: 4, y: 97},
    {id: 10191, x: 5, y: 97},
    {id: 10192, x: 6, y: 97},
    {id: 10193, x: 7, y: 97},
    {id: 10194, x: 8, y: 97},
    {id: 10195, x: 9, y: 97},
    {id: 10196, x: 10, y: 97},
    {id: 10197, x: 11, y: 97},
    {id: 10198, x: 0, y: 98},
    {id: 10199, x: 1, y: 98},
    {id: 10200, x: 7, y: 99},
    {id: 10201, x: 8, y: 99},
    {id: 10202, x: 9, y: 99},
    {id: 10203, x: 2, y: 98},
    {id: 10204, x: 3, y: 98},
    {id: 10205, x: 4, y: 98},
    {id: 10206, x: 5, y: 98},
    {id: 10207, x: 6, y: 98},
    {id: 10208, x: 7, y: 98},
    {id: 10209, x: 8, y: 98},
    {id: 10210, x: 9, y: 98},
    {id: 10211, x: 10, y: 98},
    {id: 10212, x: 11, y: 98},
    {id: 10213, x: 0, y: 99},
    {id: 10214, x: 1, y: 99},
    {id: 10215, x: 2, y: 99},
    {id: 10216, x: 3, y: 99},
    {id: 10217, x: 7, y: 99},
    {id: 10218, x: 10, y: 99},
    {id: 10219, x: 11, y: 99},
    {id: 10220, x: 9, y: 98},
  ];

  constructor(
    private http: HttpClient
  ) { }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async initPokemons() {
    if (this.pokemons.length > 0) {
      // console.log(this.pokemons);
      await this.delay(100);
      this.isInit.next(true);
      return;
    }
    this.http.get('assets/data/pokemon.csv', {responseType: 'text'}).subscribe(data => {
      data.split('\n').slice(1).forEach(element => {
        const tmp = element.split(',');
        if (tmp.length > 1 && !this.useless.includes(+tmp[0])) {
          this.pokemons.push(new Pokemon(tmp[0], tmp[1], tmp[2])); // pokemon_id name specie_id
        }
      })
      
      // TYPE
      this.http.get('assets/data/pokemon_types.csv', {responseType: 'text'}).subscribe(data2 => { 
        data2.split('\n').slice(1).forEach(element => {
          const tmp = element.split(',');
          this.pokemons.find(e => e.id == +tmp[0])?.types.push(Number(tmp[1]) - 1); // pokemon_id type_id
        })

        // STATS
        this.http.get('assets/data/pokemon_stats.csv', {responseType: 'text'}).subscribe(data3 => {
          data3.split('\n').slice(1).forEach(element => {
            const tmp = element.split(','); // pokemon_id stat_id base_stat ev
            let pokemon = this.pokemons.find(e => e.id == +tmp[0]);
            if (pokemon) {
              if (tmp[1] === '1') {
                pokemon.hp = Number(tmp[2]);
              } else if (tmp[1] === '2') {
                pokemon.atk = Number(tmp[2]);
              } else if (tmp[1] === '3') {
                pokemon.def = Number(tmp[2]);
              } else if (tmp[1] === '4') {
                pokemon.spAtk = Number(tmp[2]);
              } else if (tmp[1] === '5') {
                pokemon.spDef = Number(tmp[2]);
              } else if (tmp[1] === '6') {
                pokemon.speed = Number(tmp[2]);
                pokemon.updateTotalStat();
              }
            }
          })

          // FRENCH NAMES
          this.http.get('assets/data/pokemon_species_names.csv', {responseType: 'text'}).subscribe(data4 => { 
            data4.split('\n').slice(1).forEach(element => { // specie_id language_id name
              const tmp = element.split(',');
              if (tmp[1] === '5') {
                let pokemon = this.pokemons.find(e => e.specie == +tmp[0])
                if (pokemon) {
                  pokemon.nameFr = tmp[2];
                }
              }
            })

            // MOVES
            this.http.get('assets/data/pokemon_moves.csv', {responseType: 'text'}).subscribe(data5 => { 
              data5.split('\n').slice(1).forEach(element => { // pokemon_id  version_group_id  move_id  pokemon_move_method_id  level  order
                const tmp = element.split(',');
                if (tmp[1] === '18') {
                  let pokemon = this.pokemons.find(e => e.specie == +tmp[0])
                  if (pokemon) {
                    pokemon.moves.push(+tmp[2]);
                  }
                }
              })

              // MOVE NAMES
              this.http.get('assets/data/move_names.csv', {responseType: 'text'}).subscribe(data6 => { 
                data6.split('\n').slice(1).forEach(element => { // move_id  local_language_id  name
                  const tmp = element.split(',');
                  if (tmp[1] === '9') { // 9 = english
                    let pokemon = this.pokemons.find(e => e.specie == +tmp[0])
                    if (pokemon) {
                      this.moveNames.set(+tmp[0], tmp[2]);
                    }
                  }
                })

                // MOVE INFOS    
                this.http.get('assets/data/moves.csv', {responseType: 'text'}).subscribe(data7 => { 
                  data7.split('\n').slice(1).forEach(element => { // id,identifier,generation_id,type_id,power,pp,accuracy,priority,target_id,damage_class_id,effect_id,effect_chance,contest_type_id,contest_effect_id,super_contest_effect_id
                    const tmp = element.split(',');
                    this.moves.push(new Move(tmp[0], tmp[1], tmp[3], tmp[4]));
                  })

                  // EVOLUTIONS
                  this.http.get('assets/data/pokemon_species.csv', {responseType: 'text'}).subscribe(data8 => { 
                    data8.split('\n').slice(1).forEach(element => { // id,identifier,generation_id,evolves_from_species_id,evolution_chain_id,color_id,shape_id,habitat_id,gender_rate,capture_rate,base_happiness,is_baby,hatch_counter,has_gender_differences,growth_rate_id,forms_switchable,is_legendary,is_mythical,order,conquest_order
                      const tmp = element.split(',');
                      let pokemons = this.pokemons.filter(e => e.specie == +tmp[0]);
                      pokemons.forEach(pokemon => {
                        pokemon.evolveChain = +tmp[4];
                      });
                    })

                    console.log("ALL POKEMONS", this.pokemons);
                    console.log("ALL MOVES", this.moves);
                    this.isInit.next(true);
                  });
                });
              });
            });
          });
        });
      });
    });

  }

  getAllPokemon(limit = this.limit): Observable<any> {
    let params = new HttpParams();
    params = params.append('limit', limit);
    return this.http.get(this.baseUrl + 'pokemon', {params: params}).pipe(
        catchError(error => this.handleError(error))
      );
  }

  get(url: string): Observable<any> {
    return this.http.get(url).pipe(
        catchError(error => this.handleError(error))
      );
  }

  handleError(error) {
    console.error(error);
    return throwError('Something bad happened; please try again later.');
  }

  getImgCoord(id) {
    return this.imgCoord.find(e => e.id === id);
  }

  getTierListData(league: any): Observable<any> {
    const url = this.tierListUrl + league.folder + '/rankings-' + league.value + this.tierListParam; // ex: 1500-halloween
    return this.http.get(url).pipe(
      catchError(error => this.handleError(error))
    );
  }

  getImageId(id) {
    if (id > 10217) {
      id += 8;
    } else if (id == 10217) {
      id = 10190;
    } else if (id > 10183) {
      id += 9;
    } else if (id > 10182) {
      id += 8;
    } else if (id > 10180) {
      id += 7;
    } else if (id > 10177) {
      id += 6;
    } else if (id > 10157) {
      id += 3;
    }
    return id;
  }

}
