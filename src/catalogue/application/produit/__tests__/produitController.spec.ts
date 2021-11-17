import fs from 'fs'
import {graphql} from 'graphql'
import Resolver from "../../resolverMap";
import {createFakeServerDependenciesContainer} from "../../../../configuration/__tests__/serverDependencyContainer";
import {makeExecutableSchema} from '@graphql-tools/schema'

const catalogueContainer = createFakeServerDependenciesContainer().catalogueDependencyContainer

catalogueContainer.recupererLeProduit.exécuter = jest.fn().mockReturnValue({
    id: "1",
    nom: "Pomme",
    poids: 200,
    prix: 1
  }
);

catalogueContainer.recupererLesProduits.exécuter = jest.fn().mockReturnValue([{
  id: "1",
  nom: "Pomme",
  poids: 200,
  prix: 1
}]);

catalogueContainer.creerUnProduit = {exécuter: jest.fn()} as any

const resolvers = new Resolver(catalogueContainer).getResolvers()

const typeDefs = fs.readFileSync('./src/catalogue/application/rootSchema.graphql', 'utf8')
const schema = makeExecutableSchema({typeDefs, resolvers})

describe('ProduitController', () => {
  beforeEach(() => {
  });

  it("recupererLesProduits()", async () => {
    // Given
    const query = `
      query Query {
        recupererLesProduits {
          id
          prix
          nom
          poids
        }
      }
    `

    // When
    const result = await graphql(schema, query, null, null, null)

    // Then
    const expected = {
      data: {
        recupererLesProduits: [
          {
            id: "1",
            nom: "Pomme",
            poids: 200,
            prix: 1
          }
        ]
      }
    }
    return expect(result).toEqual(expected)
  })

  it("recupererUnProduit()", async () => {
    //Given
    const query = `
      query Query {
        recupererLeProduit(id:"1") {
          id
          prix
          nom
          poids
        }
      }
    `
    //When
    const result = await graphql(schema, query, null, null, null)

    //Then
    const expected = {
      data: {
        recupererLeProduit: {
          id: "1",
          nom: "Pomme",
          poids: 200,
          prix: 1
        }
      }
    }

    expect(result).toEqual(expected)
  });
})
