import Produit from "../../domain/entities/produit";
import CreerUnProduit from "../creerUnProduit";
import produitPortTest from "./helper/PortsTests";

describe('creerUnProduit', () => {
    describe('exécuter : quand on créé un produit', () => {
        it('alors retourne le produit créé', () => {
            // given
            const produitACréé: Produit = {
                id: "",
                nom: "Pomme",
                poids: 200,
                prix: 1
            }
            const produitSauvegardé: Produit = {
                id: "",
                nom: "Pomme",
                poids: 200,
                prix: 1
            }
            const produitPort = produitPortTest;
            produitPort.sauvegarderProduit = jest.fn().mockReturnValue(produitSauvegardé)

            // when
            const produitRetourné = new CreerUnProduit(produitPort).exécuter(produitACréé);

            // then
            expect(produitRetourné).toEqual(produitSauvegardé);
        });
    });
});
