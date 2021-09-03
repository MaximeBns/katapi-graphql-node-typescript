import fs from 'fs'
import { makeExecutableSchema } from 'graphql-tools'
import { graphql } from 'graphql'
// the actual resolvers
import Resolver from '../../resolverMap'


const allMoviesTestCase = {
  id: 'All Movies and Related Directors Test Case',
  query: `
      query Query {
        recupererLesProduits {
          id
          prix
          nom
          poids
        }
      }
    `,
  variables: { },

  // injecting the mock movie service with canned responses
  context: { movieService: mockMovieService },

  // expected result
  expected: { data: { allMovies: [
        {id: '1', title: 'Interstellar', year: '2014', director: { firstName: 'Christopher', lastName: 'Nolan' }},
        {id: '2', title: 'Mad Max: Fury Road', year: '2015', director: { firstName: 'George', lastName: 'Miller' }}] } }
}
// a nice structure for test cases
// found at https://hackernoon.com/extensive-graphql-testing-57e8760f1c25

describe('ProduitController', () => {
  // array of all test cases, just 1 for now
  // reading the actual schema
  const typeDefs = fs.readFileSync('./src/schemas/Movie.graphql', 'utf8')
  // make the actual schema and resolvers executable
  const schema = makeExecutableSchema({ typeDefs, Resolver })

  // running the test for each case in the cases array
    it("lister les produits", async () => {
      const { query, context, variables, expected } = allMoviesTestCase
      const result = await graphql(schema, query, null, context, variables)
      return expect(result).toEqual(expected)
    })
})
