import ProduitPort from "../domain/ports/produitPort";
import ProduitInformations from "../domain/entities/produitInformations";

export default class RecupererLeProduit {
	constructor(private produitPort: ProduitPort) {
		this.produitPort = produitPort;
	}

	async exécuter(id: string): Promise<ProduitInformations> {
		return await this.produitPort.récupérerLeProduit(id);
	}
}
