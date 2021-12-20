import {createPostgresConnection} from "../../../../configuration/database/createPostgresConnection";
import TypeORMClient from "../../../../configuration/database/TypeORMClient";
import DatabaseCommandeAdapter from "../DatabaseCommandeAdapter";
import {uneCommandeAvecDeuxPommesEtTroisPoires, unePoire, unePomme} from "../../../../configuration/__tests__/utils";
import assert from "assert";
import {CommandeNonTrouvee} from "../../../domain/errors/CommandeNonTrouvee";
import CommandeTypeORMEntity from "../../../configuration/db/type-orm-entity/commandeTypeORMEntity";
import {idGeneratorTest} from "../../../usecases/__tests__/helper/PortsTests";
import ProduitTypeORMEntity from "../../../configuration/db/type-orm-entity/produitTypeORMEntity";

describe('DatabaseCommandeAdapter',  () => {
    const typeORMClient = new TypeORMClient(createPostgresConnection())
    const idGenerator = idGeneratorTest
    const adapter = new DatabaseCommandeAdapter(typeORMClient, idGenerator)

    beforeEach(async () => {
        const produitsDisponibles = [unePomme(), unePoire()].map(fruit => ProduitTypeORMEntity.fromProduit(fruit))
        await typeORMClient.executeQuery(connection => connection.getRepository(ProduitTypeORMEntity).save(produitsDisponibles))
        idGenerator.generate = jest.fn().mockReturnValueOnce('4a8ca649-e26a-4ccf-950b-24158ccffc76')
            .mockReturnValue('88b0a66d-2e40-4eba-9b08-a8e954d02241')
    })

    afterEach(async () => {
        await typeORMClient.executeQuery(connection => connection.getRepository(CommandeTypeORMEntity).delete({}))
        await typeORMClient.executeQuery(connection => connection.getRepository(ProduitTypeORMEntity).delete({}))
    })

    describe('creerCommande quand on veut créer une commande', () => {
        it('sauvegarde correctement la commande en base', async () => {
            // Given
            const commande = uneCommandeAvecDeuxPommesEtTroisPoires()

            // When
            await adapter.sauvegarderCommande(commande)

            // Then
            const expectedCommandeEnBase= {
                elements: [
                    {
                        commandeId: "id",
                        id: "4a8ca649-e26a-4ccf-950b-24158ccffc76",
                        produitId: "1",
                        quantité: 2
                    },
                    {
                        commandeId: "id",
                        id: "88b0a66d-2e40-4eba-9b08-a8e954d02241",
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
            const commandeEnBase = await typeORMClient.executeQuery(connection => connection.getRepository(CommandeTypeORMEntity).findOne({id: 'id'}, {relations:['elements']}))
            expect(commandeEnBase).toEqual(expectedCommandeEnBase)
        })
    })

    describe('récupérerCommande',() => {
        it('renvoie la commande lorsqu\'elle existe', async () => {
            // Given
            const commandeEnBase = {
                elements: [
                    {
                        commandeId: "id",
                        id: "4a8ca649-e26a-4ccf-950b-24158ccffc76",
                        produitId: "1",
                        quantité: 2
                    },
                    {
                        commandeId: "id",
                        id: "88b0a66d-2e40-4eba-9b08-a8e954d02241",
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
            const commande = await adapter.récupérerCommande('id')

            // Then
            expect(commande).toEqual(uneCommandeAvecDeuxPommesEtTroisPoires())
        })

        it('récupérerCommande lève une erreur lorsque la commande n\'existe pas', async () => {
            // When
            try {
                await adapter.récupérerCommande('id')
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
                        id: "2a8ca649-e26a-4ccf-950b-24158ccffc76",
                        produitId: "1",
                        quantité: 2
                    },
                    {
                        commandeId: "id",
                        id: "18b0a66d-2e40-4eba-9b08-a8e954d02241",
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
            const commandeEnBase2 = {
                elements: [
                    {
                        commandeId: "id2",
                        id: "4a8ca649-e26a-4ccf-950b-25158ccffc76",
                        produitId: "1",
                        quantité: 2
                    },
                    {
                        commandeId: "id2",
                        id: "88b0a66d-2e40-4eba-9b08-a8e854d02241",
                        produitId: "2",
                        quantité: 3
                    }
                ],
                fraisDePort: 2.875,
                id: "id2",
                montantTotal: 13,
                poids: 1.15,
                statut: "EN_COURS"
            }
            await typeORMClient.executeQuery(connection => connection.getRepository(CommandeTypeORMEntity).save([commandeEnBase1, commandeEnBase2]))

            // When
            const commandes = await adapter.récupérerToutesLesCommandes()

            // Then
            const commande1 = uneCommandeAvecDeuxPommesEtTroisPoires()
            const commande2 = {
                ...commande1,
                id: 'id2'
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