import ProduitPort from "../domain/ports/produitPort";
import Produit from "../domain/entities/produit";
import {IdGenerator} from "../domain/ports/idGenerator";

export default class CreerUnProduit {
	constructor(private produitPort: ProduitPort, private idGenerator: IdGenerator) {}

	async exécuter(nom: string, prix: number, poids: number): Promise<Produit> {
		const produitCréé = Produit.creer(this.idGenerator.generate(), nom, prix, poids)
		await this.produitPort.sauvegarderProduit(produitCréé);
		return produitCréé
	}
}
