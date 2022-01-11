import DatabaseCommandeLoader from "../DatabaseCommandeLoader";
import assert from "assert";
import {CommandeNonTrouvee} from "../../../domain/errors/CommandeNonTrouvee";
import {createPostgresConnection} from "../../../../../configuration/database/createPostgresConnection";
import ProduitTypeORMEntity from "../../../../configuration/db/type-orm-entity/produitTypeORMEntity";
import CommandeTypeORMEntity from "../../../../configuration/db/type-orm-entity/commandeTypeORMEntity";
import TypeORMClient from "../../../../../configuration/database/TypeORMClient";
import {uneCommandeAvecDeuxPommesEtTroisPoires, unePoire, unePomme} from "../../../configuration/__tests__/utils";

describe('Read | DatabaseCommandeLoader',  () => {
    const typeORMClient = new TypeORMClient(createPostgresConnection())
    const loader = new DatabaseCommandeLoader(typeORMClient)

    beforeEach(async () => {
        const produitsDisponibles = [unePomme(), unePoire()].map(fruit => ProduitTypeORMEntity.fromProduit(fruit))
        await typeORMClient.executeQuery(connection => connection.getRepository(ProduitTypeORMEntity).save(produitsDisponibles))
    })

    afterEach(async () => {
        await typeORMClient.executeQuery(connection => connection.getRepository(CommandeTypeORMEntity).delete({}))
        await typeORMClient.executeQuery(connection => connection.getRepository(ProduitTypeORMEntity).delete({}))
    })


    describe('récupérerCommande',() => {
        it('renvoie la commande lorsqu\'elle existe', async () => {
            // Given
            const commandeEnBase = {
                elements: [
                    {
                        commandeId: "id",
                        id: "id-el-1",
                        produitId: "1",
                        quantité: 2
                    },
                    {
                        commandeId: "id",
                        id: "id-el-2",
                        produitId: "2",
                        quantité: 3
                    }
                ],
                fraisDePort: 2.875,
                id: "id",
                montantTotal: 13,
                poids: 1.15,
                statut: "EN_COURS"
            }
            await typeORMClient.executeQuery(connection => connection.getRepository(CommandeTypeORMEntity).save(commandeEnBase))

            // When
            const commande = await loader.récupérerCommande('id')

            // Then
            expect(commande).toEqual(uneCommandeAvecDeuxPommesEtTroisPoires())
        })

        it('récupérerCommande lève une erreur lorsque la commande n\'existe pas', async () => {
            // When
            try {
                await loader.récupérerCommande('id')
                assert.fail()
            } catch (e) {
                // Then
                expect(e).toBeInstanceOf(CommandeNonTrouvee)
                expect(e.message).toEqual('La commande avec l\'id id n\'existe pas')
            }

        })
    })

    describe('récupérerTouteLesCommandes', () => {
        it('récupère la liste des commandes', async () => {
            // Given
            const commandeEnBase1 = {
                elements: [
                    {
                        commandeId: "id",
                        id: "id-el-1",
                        produitId: "1",
                        quantité: 2
                    },
                    {
                        commandeId: "id",
                        id: "id-el-2",
                        produitId: "2",
                        quantité: 3
                    },
                ],
                fraisDePort: 2.875,
                id: "id",
                montantTotal: 13,
                poids: 1.15,
                statut: "EN_COURS"
            }
            const commandeEnBase2 = {
                elements: [
                    {
                        commandeId: "id2",
                        id: "id-el-3",
                        produitId: "1",
                        quantité: 2
                    },
                    {
                        commandeId: "id2",
                        id: "id-el-4",
                        produitId: "2",
                        quantité: 3
                    },
                ],
                fraisDePort: 2.875,
                id: "id2",
                montantTotal: 13,
                poids: 1.15,
                statut: "EN_COURS"
            }
            await typeORMClient.executeQuery(connection => connection.getRepository(CommandeTypeORMEntity).save([commandeEnBase1, commandeEnBase2]))

            // When
            const commandes = await loader.récupérerToutesLesCommandes()

            // Then
            const commande1 = uneCommandeAvecDeuxPommesEtTroisPoires()
            const commande2 = {
                ...commande1,
                id: 'id2',
                elements : [
                    {
                        ...commande1.elements[0],
                        id: 'id-el-3'
                    },
                    {
                        ...commande1.elements[1],
                        id: 'id-el-4'
                    },
                ]
            }
            expect(commandes.length).toEqual(2)
            expect(commandes[0]).toEqual(commande1)
            expect(commandes[1]).toEqual(commande2)

        })
    })
    
    afterAll(async () => {
        await typeORMClient.closeConnection()
    })
})