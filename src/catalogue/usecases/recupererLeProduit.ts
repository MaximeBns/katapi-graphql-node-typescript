import ProduitPort from "../domain/ports/produitPort";
import Produit from "../domain/entities/produit";

export default class RecupererLeProduit {
	constructor(private produitPort: ProduitPort) {
		this.produitPort = produitPort;
	}

	async exécuter(id: string): Promise<Produit> {
		return await this.produitPort.récupérerLeProduit(id);
	}
}
