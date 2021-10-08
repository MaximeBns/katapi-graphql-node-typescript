import fs from 'fs'
import {makeExecutableSchema} from 'graphql-tools'
import {graphql} from 'graphql'
import Resolver from "../../resolverMap";
import ProduitAdapter from "../../../infrastructure/adapter/ProduitAdapter";
import CreerUnProduit from "../../../usecases/creerUnProduit";

//https://gist.github.com/nzaghini/e038ff05c60bc2c5435f8331f890cea4
const produitAdapter = new ProduitAdapter()
const recupererProduit = {
  exécuter: jest.fn().mockReturnValue([{
      id: "",
      nom: "Pomme",
      poids: 200,
      prix: 1
    }]
  )
} as any;
const recupérerLesProduits = { produitPort: undefined, exécuter:jest.fn()} as any
const creerProduit = new CreerUnProduit(produitAdapter)
const resolvers = new Resolver(recupérerLesProduits,recupererProduit, creerProduit).getResolvers()

const typeDefs = fs.readFileSync('./src/catalogue/application/rootSchema.graphql', 'utf8')
const schema = makeExecutableSchema({typeDefs, resolvers})

xdescribe('ProduitController', () => {
  beforeEach(() => {

  });
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


    // when
    const result = await graphql(schema, query, null, null, null)

    // then
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
    // given
    const query =  `
      query Query {
        recupererLeProduit(id:"1") {
          id
          prix
          nom
          poids
        }
      }
    `
    // when
    const result = await graphql(schema, query, null, null, null)
    // then
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
