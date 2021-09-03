import fs from 'fs'
import {makeExecutableSchema} from 'graphql-tools'
import {graphql} from 'graphql'
import Resolver from "../../resolverMap";
import RecupererLesProduits from "../../../usecases/recupererLesProduits";
import ProduitAdapter from "../../../infrastructure/adapter/ProduitAdapter";
import CreerUnProduit from "../../../usecases/creerUnProduit";

// a nice structure for test cases
// found at https://hackernoon.com/extensive-graphql-testing-57e8760f1c25

describe('ProduitController', () => {
  it("lister les produits", async () => {

    //Given
    const query =  `
      query Query {
        recupererLesProduits {
          id
          prix
          nom
          poids
        }
      }
    `
    const expected = {
      data: {
        recupererLesProduits: [
          {
            id: "",
            nom: "Pomme",
            poids: 200,
            prix: 1
          }
        ]
      }
    }

    const produitAdpater = new ProduitAdapter()
    const recupererProduit = new RecupererLesProduits(produitAdpater)
    recupererProduit.exécuter = jest.fn().mockReturnValue([{
      id: "",
      nom: "Pomme",
      poids: 200,
      prix: 1
    }])

    const creerProduit = new CreerUnProduit(produitAdpater)
    const resolvers = new Resolver(recupererProduit, creerProduit).getResolvers()
    const typeDefs = fs.readFileSync('./src/catalogue/application/rootSchema.graphql', 'utf8')
    const schema = makeExecutableSchema({typeDefs, resolvers})

    //when
    const result = await graphql(schema, query, null, null, null)

    //then
    return expect(result).toEqual(expected)
  })
})
