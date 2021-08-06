import Produit from "../domain/entities/produit";
import ProduitPort from "../domain/ports/produitPort";

export default class CreerUnProduit {
    produitPort: ProduitPort;

    constructor(produitPort: ProduitPort) {
        this.produitPort = produitPort;
    }

    exécuter(produitACréer: Produit) {
        return this.produitPort.sauvegarderProduit(produitACréer);
    }
}
