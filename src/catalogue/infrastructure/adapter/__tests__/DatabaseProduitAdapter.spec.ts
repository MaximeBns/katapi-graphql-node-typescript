import {createPostgresConnection} from "../../../../configuration/database/createPostgresConnection";
import DatabaseProduitAdapter from "../DatabaseProduitAdapter";
import Produit from "../../../domain/entities/produit";
import ProduitTypeORMEntity from "../../../configuration/db/type-orm-entity/produitTypeORMEntity";
import TypeORMClient from "../../../../configuration/database/TypeORMClient";

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
            const expected_pomme = Produit.creer('idPomme','Pomme',20,1)
            expect(pomme_récupérée).toEqual(expected_pomme)
        })
    })

    describe('quand récupérerLesProduits est appelée', () => {
        it('renvoie la liste des produits en base s\'il n\'y a pas de filtre', async () => {
            // Given
            const pomme_db = new ProduitTypeORMEntity('idPomme','Pomme',20,1)
            const poire_db = new ProduitTypeORMEntity('idPoire','Poire',25,1)
            await typeORMClient.executeQuery(connection => connection.getRepository(ProduitTypeORMEntity).save([pomme_db, poire_db]))

            // When
            const produits_récupérés = await adapter.récupérerLesProduits()

            // Then
            const expected_pomme = Produit.creer('idPomme','Pomme',20,1)
            const expected_poire = Produit.creer('idPoire','Poire',25,1)
            expect(produits_récupérés).toEqual([expected_pomme, expected_poire])
        })
    })

    afterAll(async () => {
        await typeORMClient.closeConnection()
    })
})