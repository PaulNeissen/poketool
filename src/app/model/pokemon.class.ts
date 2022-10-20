export class Pokemon {
  id: number;
  //order: number;
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

  rank: number = 10000;
  shadowRank: number = 10000;
  counters: any;
  matchups: any;
  rating: number = 0;
  score: number = 0;
  scores: number[] = [];

  constructor(id: string, name: string, specie: string) {
    this.id = Number(id);
    this.name = name;
    this.specie = Number(specie);
  }

  updateTotalStat() {
    this.total = this.hp + this.atk + this.def + this.spAtk + this.spDef + this.speed;
  }

  updatePogo(data, rank, isShadow, weatherBallType) {
    this.rating = data.rating;
    if (isShadow) {
      this.shadowRank = rank;
    } else {
      this.rank = rank;
    }
    this.moveset = data.moveset;
    this.recommendedMoves = data.moveset.slice();
    this.fastMoves = data.moves.fastMoves;
    this.chargedMoves = data.moves.chargedMoves;
    this.weatherBallType = weatherBallType;
    this.score = data.score;
  }
}
