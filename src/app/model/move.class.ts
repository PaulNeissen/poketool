export class Move {
  id: number;
  type: number;
  power: number;

  constructor(id: string, type: string, power: string) {
    this.id = Number(id);
    this.type = Number(type) - 1;
    this.power = Number(power);
  }
}
