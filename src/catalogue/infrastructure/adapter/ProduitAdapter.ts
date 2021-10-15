import ProduitPort from "../../domain/ports/produitPort";
import Produit from "../../domain/entities/produit";

export default class ProduitAdapter implements ProduitPort {
    listeProduit: Produit[]

    constructor() {
        this.listeProduit = []
    }

    sauvegarderProduit(produit: Produit): Produit {
        this.listeProduit.push(produit)
        return produit
    }

    récupérerLesProduits(filter?: string, offset?: number, limit?: number): Array<Produit> {
        return this.listeProduit
    }

    récupérerLeProduit(id: string): Produit {
        return this.listeProduit.find(produit => produit.id === id)
    }
}
