import ProduitPort from "../../domain/ports/produitPort";
import Produit from "../../domain/entities/produit";

export default class ProduitAdapter implements ProduitPort{
    listeProduit: Produit[] = []

    sauvegarderProduit(produit: Produit): Produit {
        this.listeProduit.push(produit)
        return produit
    }
}
