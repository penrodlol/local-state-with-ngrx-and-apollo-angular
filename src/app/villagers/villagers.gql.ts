import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { Villagers } from './villager';

export interface IVillagersResponse {
  readonly villagers: Villagers;
}

/**
 * @client annotation is only for working w/
 *         local mock data. Remove if using
 *         real server data.
 */
@Injectable({ providedIn: 'root' })
export class VillagersGQL extends Query<
  IVillagersResponse
> {
  document = gql`
    query villagers {
      villagers @client {
        id
        name
        species
        personality
      }
    }
  `;
}
