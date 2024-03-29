import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Pokemon } from '../model/pokemon.class';
import { TypeService } from '../service/type.service';
import { MatDrawer } from '@angular/material/sidenav';
import { ModeService } from '../service/mode.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit, AfterViewInit {

  public limit: number = this.pokemonService.limit; // 1118
  public imgUrl: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png';
  public loaded: boolean = false;
  public pokemon: Pokemon | undefined;
  public opened: boolean = false;
  public isSideTeam: boolean = false;
  public isSideFusion: boolean = false;
  public team: Pokemon[] = [];
  public leagues: any[] = [
    {name: 'Great league', value: '1500', folder: 'overall'}, 
    {name: 'Ultra league', value: '2500', folder: 'overall'}, 
    {name: 'Master league', value: '10000', folder: 'overall'},
    {name: 'Retro', value: '1500-retro', folder: 'overall'},
    {name: 'Fossil Cup', value: '1500-fossil', folder: 'overall'},
    {name: 'Single-Type Cup', value: '1500-single', folder: 'overall'},
    {name: 'Will Power', value: '1500-willpower', folder: 'overall'},
    {name: 'Great Halloween', value: '1500-halloween', folder: 'overall'},
    {name: 'Ultra Halloween', value: '2500-halloween', folder: 'overall'},
  ];
  public league: any = this.leagues[0];

  displayedColumns = [['rank', 'score', 'image', 'name', 'type', 'moves', 'actions'], 
                      ['id', 'image', 'name', 'type', 'hp', 'atk', 'def', 'spAtk', 'spDef', 'speed', 'total', 'actions']];
  dataSource: MatTableDataSource<Pokemon>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(
    public pokemonService: PokemonService,
    public typeService: TypeService,
    private modeService: ModeService,
  ) {
    this.dataSource = new MatTableDataSource(undefined);
  }

  ngOnInit(): void {
    this.pokemonService.isInit.subscribe(value => {
      if (value) {
        this.dataSource.data = this.pokemonService.pokemons;
        this.getTierListData();
        this.loaded = true;
        this.modeService.currentMode.subscribe(mode => {
          let tmpTeam = localStorage.getItem('team' + mode) || '';
          if (localStorage.getItem('team' + mode)) {
            this.team = JSON.parse(tmpTeam);
          }
          this.pokemonService.pokemons = this.pokemonService.pokemons.filter(x => !x.isShadow); // TODO : not working

          if (mode == 1) {
            this.pokemonService.pokemons.sort((a, b) => a.id < b.id ? -1 : 1);
            this.dataSource.data = this.pokemonService.pokemons;
          } else {
            this.pokemonService.pokemons.sort((a, b) => a.rank < b.rank ? -1 : 1);
            this.dataSource.data = this.pokemonService.pokemons;
          }
        });
      }
    })
    this.pokemonService.initPokemons();
    this.typeService.initType();

    // console.log('MODE', this.modeService.mode);
    let tmpTeam = localStorage.getItem('team' + this.modeService.mode) || '';
    if (localStorage.getItem('team' + this.modeService.mode)) {
      this.team = JSON.parse(tmpTeam);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.customSort();
  }

  customSort() {
    if (this.modeService.mode == 0) {
      //this.sort.sort(({ id: 'rank', start: 'asc'}) as MatSortable);
    }
    this.dataSource.sort = this.sort;
  }

  // Load tier list POGO
  getTierListData() {
    if (this.modeService.mode == 0) {
      this.pokemonService.getTierListData(this.league).subscribe(data => {
        console.log("PVP DATA : ", data);
        for(let i = 0; i < data.length; i++) {
          // TODO : handle alolan and others
          const isShadow = data[i].speciesId.includes('_shadow');
          const pokeName = data[i].speciesId.replace('_shadow', '').replace('_', '-').replace('galarian', 'galar').replace('alolan', 'alola');
          let pokemon = this.pokemonService.pokemons.find(x => x.name == pokeName);

          // handle non existing pokemon in csv (like hisuian pokemons)
          if (pokemon == undefined) {
            if (pokeName == "qwilfish-hisuian") {
              let tmpPokemon = this.pokemonService.pokemons.find(x => x.name.includes("qw"));
              pokemon = new Pokemon(tmpPokemon.id.toString(), pokeName, tmpPokemon.specie.toString());
              pokemon.clone(tmpPokemon);
              pokemon.name = "qwilfish-hisuian";
              pokemon.types = [3,16];
              this.pokemonService.pokemons.push(pokemon);
            }
          }

          if (pokemon) {

            // weather ball
            let weatherBallType = -1;

            // moveset
            data[i].moveset = data[i].moveset.map(x => {
              let moveName = x.replaceAll('_','-').toLowerCase();
              if (moveName.includes('weather')) { // Handle weather ball type
                let moveSplit = moveName.split('-');
                weatherBallType = this.typeService.getTypeId(moveSplit[2]);
                moveName = 'weather-ball';
              }
              return this.pokemonService.moves.find(y => y.name == moveName)?.id;
            });

            // Fast moves
            data[i].moves.fastMoves = data[i].moves.fastMoves.map(x => this.getMoveNameFromPogo(x.moveId));

            // ChargedMoves
            data[i].moves.chargedMoves = data[i].moves.chargedMoves.map(x => this.getMoveNameFromPogo(x.moveId));

            if (isShadow) {
              let tmpPoke = new Pokemon(pokemon.id.toString(), pokemon.name, pokemon.specie.toString());
              tmpPoke.clone(pokemon);
              tmpPoke.updatePogo(data[i], i+1, isShadow, weatherBallType);
              this.pokemonService.pokemons.push(tmpPoke);
            } else {
              pokemon.updatePogo(data[i], i+1, isShadow, weatherBallType);
            }
          }
        }
        // Sort by rank
        this.pokemonService.pokemons.sort((a, b) => a.rank < b.rank ? -1 : 1)
        console.log("POGO POKEMONS", this.pokemonService.pokemons);
        this.dataSource.data = this.pokemonService.pokemons;
      })
    }
  }

  getMoveNameFromPogo(pogoMoveName) {
    let moveName = pogoMoveName.replaceAll('_','-').toLowerCase();
    if (moveName.includes('weather')) { // Handle weather ball type
      moveName = 'weather-ball';
    }
    return this.pokemonService.moves.find(y => y.name == moveName)?.id;
  }

  getAllPokemonsDetails(limit) {
    this.pokemonService.getAllPokemon(limit).subscribe(response => {
      console.log(response);
      this.pokemonService.get(response.results[0].url).subscribe(pokemon => {
        console.log(pokemon);
      });
    });
  }

  applyFilter(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getTypeColumnStyle(pokemon) {
    return 'min-width: ' + (40 * pokemon.types.length) + 'px';
  }

  getTypeSrc(type) {
    return this.typeService.getTypeImgFromId(type);
  }

  toggleSideNav(pokemon) {
    if (!this.isSideTeam && this.pokemon && pokemon.id == this.pokemon.id) {
      this.drawer.toggle();
      this.opened = !this.opened;
      this.isSideTeam = false;
      this.pokemon = undefined;
    } else {
      this.pokemon = pokemon;
      this.drawer.open();
      this.opened = true;
      this.isSideTeam = false;
    }
  }

  closeDrawer() {
    this.drawer.toggle();
    this.opened = false;
    this.isSideTeam = false;
    this.isSideFusion = false;
    this.pokemon = undefined;
  }

  addToTeam($event, pokemon) {
    $event.stopPropagation();
    if (!this.team.find(e => e.id === pokemon.id) && this.team.length < this.modeService.getTeamSize()) {
      // Add sorted moves names to the pokemon
      let tmpArray: any[] = [];
      pokemon.moves.forEach(move => {
        let tmp = this.pokemonService.moveNames.get(move);
        tmpArray.push([move, tmp]);
      });
      tmpArray.sort((a,b) => a[1].localeCompare(b[1]));
      pokemon.moves = tmpArray.map(x => x[0]);

      this.team.push(pokemon);
      this.team = this.team.slice();
      this.saveTeam();
    }
  }

  removePokemon(pokemon) {
    this.team = this.team.filter(e => e.id !== pokemon.id);
    pokemon.moveset = pokemon.recommendedMoves.slice();
    this.saveTeam();
  }

  displayTeamStats() {
    if (this.opened && this.isSideTeam) {
      this.drawer.close();
      this.opened = false;
      this.isSideTeam = false;
      this.isSideFusion = false;
    } else {
      this.drawer.open();
      this.opened = true;
      this.isSideTeam = true;
      this.isSideFusion = false;
    }
  }

  getMode() {
    return this.modeService.mode;
  }

  changeLeague() {
    this.pokemonService.pokemons = this.pokemonService.pokemons.filter(x => !x.isShadow);
    this.pokemonService.pokemons.forEach(pokemon => {
      pokemon.rank = 10000;
    });
    this.getTierListData();
  }

  getImageId(id) {
    return this.pokemonService.getImageId(id);
  }

  getIds() {
    let result: number[] = [];
    for(let i = 1; i < 250; i++) {
      result.push(10000 + i);
    }
    return result;
  }

  getMoveType(move, weatherBallType) {
    return this.typeService.getMoveTypeName(move, weatherBallType);
  }

  getMoveName(move) {
    return this.pokemonService.moveNames.get(move);
  }

  saveTeam() {
    localStorage.setItem('team' + this.modeService.mode, JSON.stringify(this.team));
  }

  getLeagueError() {
    return this.pokemonService.leagueError;
  }

  displayFusion() {
    if (this.opened && this.isSideFusion) {
      this.drawer.close();
      this.opened = false;
      this.isSideFusion = false;
    } else {
      this.drawer.open();
      this.opened = true;
      this.isSideFusion = true;
      this.isSideTeam = false;
    }
  }
}
