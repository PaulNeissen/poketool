export class Stat {

  readonly labels = ['HP','Atk','Def','SpA','SpD','Spd'];

  id: number;

  constructor(element) {
    this.id = element.id;
  }
}
