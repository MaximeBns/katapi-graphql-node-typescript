import ProduitPort from "../domain/ports/produitPort";
import Produit from "../domain/entities/produit";

export default class CreerUnProduit {
	produitPort: ProduitPort;

	constructor(produitPort: ProduitPort) {
		this.produitPort = produitPort;
	}

	exécuter(nom: string, prix: number, poids: number): Produit {
		const produitCréé = Produit.creer(nom, prix, poids)
		return this.produitPort.sauvegarderProduit(produitCréé);
	}
}
