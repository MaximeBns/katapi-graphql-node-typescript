import Produit from "../../../domain/entities/produit";
import ProduitAdapter from "../ProduitAdapter";

describe("ProduitAdapter", () => {
    describe("sauvegarderProduit quand on sauvegarde un produit", () => {
        it("ajoute le produit recu en paramètres dans un tableau", () => {
            //given
            const produitASauvegarder: Produit = {
                id: "",
                nom: "Pastèque",
                prix: 20,
                poids: 5,
            }
            const produitAdapter = new ProduitAdapter()
            //when
            produitAdapter.sauvegarderProduit(produitASauvegarder)
            //then
            expect(produitAdapter.listeProduit).toContain(produitASauvegarder)
        });
    });

});
