import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pokemon } from '../model/pokemon.class';
import { FusionService } from '../service/fusion.service';
import { PokemonService } from '../service/pokemon.service';
import { TypeService } from '../service/type.service';

@Component({
  selector: 'app-search-fusion',
  templateUrl: './search-fusion.component.html',
  styleUrls: ['./search-fusion.component.less']
})
export class SearchFusionComponent implements OnInit {

  public team: Pokemon[] = [];
  public loaded: boolean = false;
  public showLegendary = false;
  public nameFilter: string = '';
  public typeFilter: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];

  displayedColumns = ['id', 'name', 'type', 'hp', 'atk', 'def', 'spAtk', 'spDef', 'speed', 'total', 'altTotal'];
  dataSource: MatTableDataSource<Pokemon>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public typeService: TypeService, 
    public pokemonService: PokemonService,
    public fusionService: FusionService
  ) {
    this.dataSource = new MatTableDataSource(undefined);
  }

  ngOnInit(): void {
    this.pokemonService.isInit.subscribe(value => {
      if (value) {
        this.pokemonService.pokemons.sort((a, b) => a.id < b.id ? -1 : 1);
        this.fusionService.initFusions();
        this.applyFilter(null);
        this.loaded = true;
      }
    })
    this.pokemonService.initPokemons();
    this.typeService.initType();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event) {
    let tmp = this.fusionService.fusions;

    // LEGENDARY
    if (!this.showLegendary) {
      tmp = tmp.filter(x => !x.legendary);
    }

    // TYPE
    if (!this.typeFilter.every(x => x == false)) {
      for(let i = 0; i < 18; i++) {
        if (this.typeFilter[i]) {
          tmp = tmp.filter(x => x.types.includes(i));
        }
      }
    }

    // NAME
    this.nameFilter.split(' ').forEach(filter => {
      tmp = tmp.filter(x => x.name.includes(filter));
    });

    this.dataSource.data = tmp;
  }

  getTypeSrc(type) {
    return this.typeService.getTypeImgFromId(type);
  }

  getTypeColumnStyle(pokemon) {
    return 'min-width: ' + (40 * pokemon.types.length) + 'px';
  }

  getTypes() {
    return this.typeService.types;
  }
}
