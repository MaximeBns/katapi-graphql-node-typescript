import DatabaseProduitAdapter from "../DatabaseProduitAdapter";
import Produit from "../../../domain/entities/produit";
import {createPostgresConnection} from "../../../../../configuration/database/createPostgresConnection";
import TypeORMClient from "../../../../../configuration/database/TypeORMClient";
import ProduitTypeORMEntity from "../../../../configuration/db/type-orm-entity/produitTypeORMEntity";
import ProduitInformations from "../../../../read/domain/entities/produitInformations";

describe('DatabaseProduitAdapter',  () => {
    const typeORMClient = new TypeORMClient(createPostgresConnection())
    const adapter = new DatabaseProduitAdapter(typeORMClient)

    afterEach(async () => {
        await typeORMClient.executeQuery(connection => connection.getRepository(ProduitTypeORMEntity).delete({}))
    })

    describe('quand sauvegarderProduit est appelée', () => {
        it("sauvegarde le produit en base", async () => {
            // given
            const pasteque: Produit = {
                id: "pastequeId",
                nom: "Pastèque",
                prix: 22,
                poids: 5,
            }

            // when
            await adapter.sauvegarderProduit(pasteque)

            // then
            const pastequeEnBase = await typeORMClient.executeQuery<ProduitTypeORMEntity>(connection => connection.getRepository(ProduitTypeORMEntity).findOne({id: "pastequeId"}))
            expect(pastequeEnBase).toEqual(pasteque)
        });
    })

    describe('quand récupérerLeProduit est appelée', () => {
        it('renvoie le produit s\'il existe', async () => {
            // Given
            const pomme_db = new ProduitTypeORMEntity('idPomme','Pomme',20,1)
            await typeORMClient.executeQuery(connection => connection.getRepository(ProduitTypeORMEntity).save(pomme_db))

            // When
            const pomme_récupérée = await adapter.récupérerLeProduit('idPomme')

            // Then
            const expected_pomme = ProduitInformations.creer('idPomme','Pomme',20,1)
            expect(pomme_récupérée).toEqual(expected_pomme)
        })
    })

    afterAll(async () => {
        await typeORMClient.closeConnection()
    })
})