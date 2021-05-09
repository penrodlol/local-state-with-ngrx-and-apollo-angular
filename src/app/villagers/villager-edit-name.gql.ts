import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { IVillager } from './villager';

export interface IVillagerEditNameVariables {
  readonly id: number;
  readonly name: string;
}

export interface IVillagerEditNameResponse {
  readonly editVillagerName: IVillager;
}

/**
 * @client annotation is only for working w/
 *         local mock data. Remove if using
 *         real server data.
 */
@Injectable({ providedIn: 'root' })
export class VillagerEditNameGQL extends Mutation<
  IVillagerEditNameResponse,
  IVillagerEditNameVariables
> {
  document = gql`
    mutation editVillagerName($id: ID!, $name: String) {
      editVillagerName(id: $id, name: $name) @client {
        id
        name
      }
    }
  `;
}
