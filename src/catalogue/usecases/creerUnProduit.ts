import ProduitPort from "../domain/ports/produitPort";
import Produit from "../domain/entities/produit";
import { Service } from "typedi";
import ProduitAdapter from "../infrastructure/adapter/ProduitAdapter";

@Service()
export default class CreerUnProduit {
    produitPort: ProduitPort;

    constructor(produitPort: ProduitAdapter) {
        this.produitPort = produitPort;
    }

    exécuter(nom: string, prix: number, poids: number): Produit {
        const produitCréé = Produit.creer(nom, prix, poids)
        return this.produitPort.sauvegarderProduit(produitCréé);
    }
}