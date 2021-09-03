import fs from 'fs'
import {makeExecutableSchema} from 'graphql-tools'
import {graphql} from 'graphql'
import Resolver from "../../resolverMap";
import RecupererLesProduits from "../../../usecases/recupererLesProduits";
import ProduitAdapter from "../../../infrastructure/adapter/ProduitAdapter";
import CreerUnProduit from "../../../usecases/creerUnProduit";

//https://gist.github.com/nzaghini/e038ff05c60bc2c5435f8331f890cea4
describe('ProduitController', () => {
  it("recupererLesProduits()", async () => {
    //given
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
    const produitAdpater = new ProduitAdapter()
    const recupererProduit = {
      exécuter: jest.fn().mockReturnValue([{
            id: "",
            nom: "Pomme",
            poids: 200,
            prix: 1
          }]
      )
    } as any;

    const creerProduit = new CreerUnProduit(produitAdpater)
    const resolvers = new Resolver(recupererProduit, creerProduit).getResolvers()
    const typeDefs = fs.readFileSync('./src/catalogue/application/rootSchema.graphql', 'utf8')
    const schema = makeExecutableSchema({typeDefs, resolvers})

    // when
    const result = await graphql(schema, query, null, null, null)

    // then
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
    return expect(result).toEqual(expected)
  })
})
