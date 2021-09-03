import ProduitPort from "../../domain/ports/produitPort";
import Produit from "../../domain/entities/produit";
import { Service } from "typedi";

@Service()
export default class ProduitAdapter implements ProduitPort {
    listeProduit: Produit[] = []

    sauvegarderProduit(produit: Produit): Produit {
        this.listeProduit.push(produit)
        return produit
    }

    récupérerLesProduits(): Array<Produit> {
        return this.listeProduit;
    }
}
