export class Move {
  id: number;
  name: string;
  type: number;
  power: number;

  constructor(id: string, name: string, type: string, power: string) {
    this.id = Number(id);
    this.name = name;
    this.type = Number(type) - 1;
    this.power = Number(power);
  }
}
