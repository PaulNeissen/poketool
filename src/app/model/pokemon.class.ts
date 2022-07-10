export class Pokemon {
  id: number;
  //order: number;
  name: string;
  types: number[] = [];
  specie: number;
  nameFr: string = '';

  // Stats
  hp: number = 0;
  atk: number = 0;
  def: number = 0;
  spAtk: number = 0;
  spDef: number = 0;
  speed: number = 0;
  total: number = 0;

  /*constructor(element) {
    this.id = element.id;
    this.order = element.order;
    this.name = element.name;
    this.types = element.types;

    this.hp = element.stats[0].base_stat;
    this.atk = element.stats[1].base_stat;
    this.def = element.stats[2].base_stat;
    this.spAtk = element.stats[3].base_stat;
    this.spDef = element.stats[4].base_stat;
    this.speed = element.stats[5].base_stat;
    this.total = this.hp + this.atk + this.def + this.spAtk + this.spDef + this.speed;
  }*/

  constructor(id: string, name: string, specie: string) {
    this.id = Number(id);
    this.name = name;
    this.specie = Number(specie);
  }

  updateTotalStat() {
    this.total = this.hp + this.atk + this.def + this.spAtk + this.spDef + this.speed;
  }

}
