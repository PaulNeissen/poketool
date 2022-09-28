import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Pokemon } from '../model/pokemon.class';
import { TypeService } from '../service/type.service';
import { MatDrawer } from '@angular/material/sidenav';
import { templateSourceUrl } from '@angular/compiler';
import { ModeService } from '../service/mode.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit, AfterViewInit {

  public pokemons: any[] = [];
  public limit: number = this.pokemonService.limit; // 1118
  public imgUrl: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png';
  public loaded: boolean = false;
  public pokemon: Pokemon | undefined;
  public opened: boolean = false;
  public isSideTeam: boolean = false;
  public team: Pokemon[] = [];

  displayedColumns = [['id', 'name', 'type', 'actions'], 
                      ['id', 'name', 'type', 'hp', 'atk', 'def', 'spAtk', 'spDef', 'speed', 'total', 'actions']];
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
        this.loaded = true;
      }
    })
    this.pokemonService.initPokemons();
    this.typeService.initType();

    let tmpTeam = localStorage.getItem('team') || '';
    if (localStorage.getItem('team')) {
      this.team = JSON.parse(tmpTeam);
    }

    // this.getAllPokemonsDetails(1);
  }

  getAllPokemonsDetails(limit) {
    this.pokemonService.getAllPokemon(limit).subscribe(response => {
      console.log(response);
      this.pokemonService.get(response.results[0].url).subscribe(pokemon => {
        console.log(pokemon);
      });
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
      localStorage.setItem('team', JSON.stringify(this.team));
    }
  }

  removePokemon(pokemon) {
    this.team = this.team.filter(e => e.id !== pokemon.id);
    localStorage.setItem('team', JSON.stringify(this.team));
  }

  displayTeamStats() {
    if (this.opened && this.isSideTeam) {
      this.drawer.close();
      this.opened = false;
      this.isSideTeam = false;
    } else {
      this.drawer.open();
      this.opened = true;
      this.isSideTeam = true;
    }
  }

  getMode() {
    return this.modeService.mode;
  }
}
