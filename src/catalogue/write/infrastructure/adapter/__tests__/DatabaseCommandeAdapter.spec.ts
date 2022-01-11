import DatabaseCommandeAdapter from "../DatabaseCommandeAdapter";
import {createPostgresConnection} from "../../../../../configuration/database/createPostgresConnection";
import {uneCommandeAvecDeuxPommesEtTroisPoires, unePoire, unePomme} from "../../../configuration/__tests__/utils";
import ProduitTypeORMEntity from "../../../../configuration/db/type-orm-entity/produitTypeORMEntity";
import CommandeTypeORMEntity from "../../../../configuration/db/type-orm-entity/commandeTypeORMEntity";
import TypeORMClient from "../../../../../configuration/database/TypeORMClient";

describe('DatabaseCommandeAdapter',  () => {
    const typeORMClient = new TypeORMClient(createPostgresConnection())
    const adapter = new DatabaseCommandeAdapter(typeORMClient)

    beforeEach(async () => {
        const produitsDisponibles = [unePomme(), unePoire()].map(fruit => ProduitTypeORMEntity.fromProduit(fruit))
        await typeORMClient.executeQuery(connection => connection.getRepository(ProduitTypeORMEntity).save(produitsDisponibles))
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
            const commandeEnBase = await typeORMClient.executeQuery(connection => connection.getRepository(CommandeTypeORMEntity).findOne({id: 'id'}, {relations:['elements']}))
            expect(commandeEnBase).toEqual(expectedCommandeEnBase)
        })
    })

    afterAll(async () => {
        await typeORMClient.closeConnection()
    })
})