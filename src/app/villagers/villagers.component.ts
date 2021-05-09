import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { VillagersStore } from './villagers.store';

@Component({
  selector: 'app-villagers',
  template: `
    <section>
      <div *ngFor="let villager of villagers$ | async">
        <h2
          #name
          contentEditable
          title="Edit name"
          (blur)="editName(villager.id, name.innerText?.trim())">
          {{villager.name}}
        </h2>
        <p>Type: {{villager.species}}</p>
        <p>Personality: {{villager.personality}}</p>
      </div>
    </section>`,
  providers: [VillagersStore],
})
export class VillagersComponent implements OnInit {
  readonly villagers$ = this.store.villagers$;

  constructor(private readonly store: VillagersStore) { }

  ngOnInit(): void { this.store.fetchAll(); }

  editName(id: number, name: string): void {
    this.store.editName({ id, name });
  }
}

@NgModule({
  declarations: [VillagersComponent],
  imports: [CommonModule],
  exports: [VillagersComponent],
})
export class VillagersModule { }
