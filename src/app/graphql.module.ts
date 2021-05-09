import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { villagers } from '../villagers.stub';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({ uri: '' }),
    cache: new InMemoryCache({ addTypename: false }),
    resolvers: { // Working w/ MOCK data.
      Query: { villagers: () => villagers },
      Mutation: { editVillagerName: (_, { id, name }) => ({ id, name }), }
    },
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
