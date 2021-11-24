import {createFakeServerDependenciesContainer} from "../../../../configuration/__tests__/serverDependencyContainer";
import {CatalogueDependencyContainer} from "../../../configuration/catalogue.dependencyContainer";
import Resolver from "../../resolverMap";
import fs from "fs";
import {makeExecutableSchema} from "@graphql-tools/schema";
import {graphql, GraphQLSchema} from "graphql";
import {uneCommandeAvecDeuxPommesEtTroisPoires} from "../../../../configuration/__tests__/utils";


describe('CommandeController', () => {
    let catalogueDependencyContainer : CatalogueDependencyContainer
    let schema: GraphQLSchema

    beforeEach(() => {
        catalogueDependencyContainer = createFakeServerDependenciesContainer().catalogueDependencyContainer
        catalogueDependencyContainer.recupererLesCommandes.exécuter = jest.fn()
            .mockReturnValue([uneCommandeAvecDeuxPommesEtTroisPoires()])
        const resolvers = new Resolver(catalogueDependencyContainer).getResolvers()
        const typeDefs = fs.readFileSync('./src/catalogue/application/rootSchema.graphql', 'utf8')
        schema = makeExecutableSchema({typeDefs, resolvers})
    })

    it('recupererLesCommandes', async () => {
        // Given
        const query = `
          query Query {
            recupererLesCommandes {
              ... on ListeCommande {
                commandes {
                  id
                  statut
                  elements {
                    quantite
                    produit {
                        ... on Produit {
                           nom
                           prix
                        }
                    }
                  }
                  fraisDePort
                  montantTotal
                  poids
                }
              }
            }
          }
        `

        // When
        const result = await graphql(schema, query, null, null, null)

        // Then
        const expected = {
            data: {
                recupererLesCommandes: {
                    commandes: [
                        {
                            id: "id",
                            statut: "EN_COURS",
                            poids: 1.15,
                            montantTotal: 13,
                            fraisDePort: 2.875,
                            elements : [
                                {
                                    produit: {nom: 'Pomme', prix: 2},
                                    quantite: 2
                                },
                                {
                                    produit: {nom: 'Poire', prix: 3},
                                    quantite: 3
                                }
                            ]
                        }
                    ]
                }
            }
        }
        return expect(result).toEqual(expected)

    })
})