import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { EMPTY, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IVillager, Villagers } from './villager';
import { VillagerEditNameGQL } from './villager-edit-name.gql';
import { VillagersGQL } from './villagers.gql';

export interface IVillagersState {
  readonly villagers: Villagers;
}

@Injectable()
export class VillagersStore extends ComponentStore<
  IVillagersState
> {
  constructor(
    private readonly villagersGQL: VillagersGQL,
    private readonly editNameGQL: VillagerEditNameGQL,
  ) {
    super({ villagers: [] });
  }

  readonly villagers$ = this.select(({ villagers }) => villagers);

  readonly fetchAll = this.effect((event$) => event$.pipe(
    switchMap(() => this.villagersGQL.fetch().pipe(
      tapResponse(
        (res) => this.addMany(res?.data?.villagers),
        (error) => {
          console.error(`Error fetching villagers: ${error}`);
          return EMPTY;
        },
      )
    )),
  ));

  readonly addMany = this.updater((_, villagers: Villagers) => ({
    villagers,
  }));

  readonly updateOne = this.updater((state, update: Partial<
    IVillager
  >) => ({
    villagers: state.villagers.map(villager =>
      villager.id === update?.id
        ? { ...villager, ...update }
        : villager,
    ),
  }));

  readonly editName = this.effect((update$: Observable<
    Pick<IVillager, 'id' | 'name'
  >>) => {
    return update$.pipe(
      switchMap((update) => this.editNameGQL.mutate(update).pipe(
        tapResponse(
          (res) => this.updateOne(res?.data?.editVillagerName),
          (error) => {
            console.error(`Error changing villager name: ${error}`);
            return EMPTY;
          },
        ),
      )),
    );
  });
}
