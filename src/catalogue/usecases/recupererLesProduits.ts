import ProduitPort from "../domain/ports/produitPort";
import Produit from "../domain/entities/produit";

export default class RecupererLesProduits {
	produitPort: ProduitPort;

	constructor(produitPort: ProduitPort) { // Ça ne nous plaît pas du tout mais on demande le type ProduitAdapter ici à la place du ProduitPort car TypeDi ne sait pas gérer les interfaces (car elles ne sont pas transpilées en JS)
		this.produitPort = produitPort;        // https://github.com/typestack/typedi/issues/70
	}

	exécuter(filter?: string): Array<Produit> {
		const produitsNonFiltres = this.produitPort.récupérerLesProduits();
		return filter
			? produitsNonFiltres.filter(produit => produit.nom.toLowerCase()
				.includes(filter.toLowerCase()))
			: produitsNonFiltres;
	}
}
