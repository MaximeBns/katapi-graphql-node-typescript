import Produit from "../../domain/entities/produit";
import ProduitPort from "../../domain/ports/produitPort";
import CreerUnProduit from "../creerUnProduit";

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
            const produitPort: ProduitPort = {
                sauvegarderProduit: jest.fn().mockReturnValue(produitSauvegardé)
            }

            // when
            const produitRetourné = new CreerUnProduit(produitPort).exécuter(produitACréé);

            // then
            expect(produitRetourné).toEqual(produitSauvegardé);
        });
    });
});
