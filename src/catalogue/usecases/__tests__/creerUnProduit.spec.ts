import CreerUnProduit from "../creerUnProduit";
import {idGeneratorTest, produitPortTest} from "./helper/PortsTests";

describe('creerUnProduit', () => {
    const produitPort = produitPortTest;
    const idGenerator = idGeneratorTest;
    const creerUnProduit = new CreerUnProduit(produitPort, idGenerator)

    describe('exécuter : quand on créé un produit', () => {
        it('alors retourne le produit créé', async () => {
            // given
            idGenerator.generate = jest.fn().mockReturnValue("idPomme")

            // when
            const produitRetourné = await creerUnProduit.exécuter("Pomme", 1, 200);

            // then
            const pomme = {
                id: "idPomme",
                nom: "Pomme",
                prix: 1,
                poids: 200
            }
            expect(produitRetourné).toEqual(pomme);
        });
    });
});
