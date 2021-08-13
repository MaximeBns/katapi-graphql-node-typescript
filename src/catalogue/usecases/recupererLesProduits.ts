import ProduitPort from "../domain/ports/produitPort";
import Produit from "../domain/entities/produit";

export default class RecupererLesProduits {
    produitPort: ProduitPort;

    constructor(produitPort: ProduitPort) {
        this.produitPort = produitPort;
    }

    exécuter(): Array<Produit> {
        return this.produitPort.récupérerLesProduits();
    }
}
