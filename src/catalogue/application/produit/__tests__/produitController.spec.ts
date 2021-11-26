import fs from 'fs'
import {makeExecutableSchema} from '@graphql-tools/schema'
import {graphql} from 'graphql'
import Resolver from "../../resolverMap";
import {CatalogueDependencyContainer} from "../../../configuration/catalogue.dependencyContainer";
import {ServerDependencyContainer} from "../../../../configuration/serverDependencyContainer";

//https://gist.github.com/nzaghini/e038ff05c60bc2c5435f8331f890cea4
const recupererProduit = {
  exécuter: jest.fn().mockReturnValue({
      id: "1",
      nom: "Pomme",
      poids: 200,
      prix: 1
    }
  )
};
const recupérerLesProduits = {
  exécuter: jest.fn().mockReturnValue([{
    id: "1",
    nom: "Pomme",
    poids: 200,
    prix: 1
  }])
};
const creerProduit = {exécuter: jest.fn()} as any

const catalogueContainer = {
  recupererLeProduit: recupererProduit,
  recupererLesProduits: recupérerLesProduits,
  creerUnProduit: creerProduit
} as unknown as CatalogueDependencyContainer

const serverContainer = {catalogueDependencyContainer: catalogueContainer} as ServerDependencyContainer;

const resolvers = new Resolver(serverContainer).getResolvers()

const typeDefs = fs.readFileSync('./src/catalogue/application/rootSchema.graphql', 'utf8')
const schema = makeExecutableSchema({typeDefs, resolvers})

describe('ProduitController', () => {
  it("recupererLesProduits()", async () => {
    //given
    const query = `
      query Query {
        recupererLesProduits {
          ... on ListeProduit {
            produits {
              id
              prix
              nom
              poids
            }
          }
        }
      }
    `


    // when
    const result = await graphql(schema, query, null, null, null)

    // then
    const expected = {
      data: {
        recupererLesProduits: {
          __typename: 'ListeDeProduits',
          produits: [
            {
              id: "1",
              nom: "Pomme",
              poids: 200,
              prix: 1
            }
          ]
        }
      }
    }
    return expect(result).toEqual(expected)
  })
  it("recupererUnProduit()", async () => {
    // given
    const query = `
      query Query {
        recupererLeProduit(id:"1") {
        ... on Produit {
          __typename
          id
          prix
          nom
          poids
        }
        }
      }
    `
    // when
    const result = await graphql(schema, query, null, null, null)
    // then
    const expected = {
      data: {
        recupererLeProduit: {
          __typename: 'Produit',
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
