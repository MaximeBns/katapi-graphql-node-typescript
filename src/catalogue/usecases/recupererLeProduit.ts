import ProduitPort from "../domain/ports/produitPort";
import Produit from "../domain/entities/produit";

export default class RecupererLeProduit {
	constructor(private produitPort: ProduitPort) {
		this.produitPort = produitPort;
	}

	exécuter(id: string): Produit {
		return this.produitPort.récupérerLeProduit(id);
	}
}
