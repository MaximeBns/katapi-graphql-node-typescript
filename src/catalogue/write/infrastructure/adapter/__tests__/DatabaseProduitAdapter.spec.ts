import DatabaseProduitAdapter from "../DatabaseProduitAdapter";
import Produit from "../../../domain/entities/produit";
import {createPostgresConnection} from "../../../../../configuration/database/createPostgresConnection";
import TypeORMClient from "../../../../../configuration/database/TypeORMClient";
import ProduitTypeORMEntity from "../../../../configuration/db/type-orm-entity/produitTypeORMEntity";

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

    afterAll(async () => {
        await typeORMClient.closeConnection()
    })
})