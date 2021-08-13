import Produit from "../../domain/entities/produit";
import CreerUnProduit from "../creerUnProduit";
import produitPortTest from "./helper/PortsTests";
import RecupererLesProduits from "../recupererLesProduits";

describe('recupererLesProduits', () => {
    describe('exécuter : quand on récupère les produits', () => {
        it('alors retourne les produits', () => {
            // given
            const produitPort = produitPortTest;
            const produitSauvegardés: Array<Produit> = [{
                id: "",
                nom: "Pomme",
                poids: 200,
                prix: 1
            }];
            produitPort.récupérerLesProduits = jest.fn().mockReturnValue(produitSauvegardés)

            // when
            const produitRetourné = new RecupererLesProduits(produitPort).exécuter();

            // then
            const produitsAttendus = [{
                id: "",
                nom: "Pomme",
                poids: 200,
                prix: 1
            }];
            expect(produitRetourné).toEqual(produitsAttendus);
        });
    });
});
