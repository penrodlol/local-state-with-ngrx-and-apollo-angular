export interface IVillager {
  readonly id: number;
  readonly name: string;
  readonly species: string;
  readonly personality: string;
}

export type Villagers = ReadonlyArray<IVillager>;
