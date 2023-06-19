export class Pokemon {
  id: number;
  name: string;
  types: number[] = [];
  specie: number;
  nameFr: string = '';
  moves: number[] = [];
  fastMoves: number[] = [];
  chargedMoves: number[] = [];
  moveset: number[] = [];
  recommendedMoves: number[] = [];
  weatherBallType: number = -1;
  evolveTo: number = 0;
  evolveFrom: number = 0;
  evolveChain: number = 0;

  // Stats
  hp: number = 0;
  atk: number = 0;
  def: number = 0;
  spAtk: number = 0;
  spDef: number = 0;
  speed: number = 0;
  total: number = 0;

  // POGO
  isShadow: boolean = false;
  rank: number = 9999;
  counters: any;
  matchups: any;
  rating: number = 0;
  score: number = 0;
  scores: number[] = [];

  // Options simulator
  defOption: number = 1;

  constructor(id: string, name: string, specie: string) {
    this.id = Number(id);
    this.name = name;
    this.specie = Number(specie);
  }

  updateTotalStat() {
    this.total = this.hp + this.atk + this.def + this.spAtk + this.spDef + this.speed;
  }

  updatePogo(data, rank, isShadow, weatherBallType) {
    this.isShadow = isShadow;
    this.rating = data.rating;
    this.rank = rank;
    this.moveset = data.moveset;
    this.recommendedMoves = data.moveset.slice();
    this.fastMoves = data.moves.fastMoves;
    this.chargedMoves = data.moves.chargedMoves;
    this.weatherBallType = weatherBallType;
    this.score = data.score;
  }

  clone(pokemon: Pokemon) {
    this.id = pokemon.id;
    this.name = pokemon.name;
    this.types = pokemon.types;
    this.specie = pokemon.specie;
    this.nameFr = pokemon.nameFr;
    this.moves = pokemon.moves;
    this.fastMoves = pokemon.fastMoves;
    this.chargedMoves = pokemon.chargedMoves;
    this.moveset = pokemon.moveset;
    this.recommendedMoves = pokemon.recommendedMoves;
    this.weatherBallType = pokemon.weatherBallType;
    this.evolveTo = pokemon.evolveTo;
    this.evolveFrom = pokemon.evolveFrom;
    this.evolveChain = pokemon.evolveChain;

    // Stats
    this.hp = pokemon.hp;
    this.atk = pokemon.atk;
    this.def = pokemon.def;
    this.spAtk = pokemon.spAtk;
    this.spDef = pokemon.spDef;
    this.speed = pokemon.speed;
    this.total = pokemon.total;

    this.isShadow = pokemon.isShadow;
    this.rank = pokemon.rank;
    this.counters = pokemon.counters;
    this.matchups = pokemon.matchups;
    this.rating = pokemon.rating;
    this.score = pokemon.score;
    this.scores = pokemon.scores;

    this.defOption = pokemon.defOption;
  }
}
