import ProduitPort from "../domain/ports/produitPort";
import Produit from "../domain/entities/produit";


export default class RecupererLesProduits {
  constructor(private produitPort: ProduitPort) {
    this.produitPort = produitPort;
  }

  exécuter(filter?: string): Array<Produit> {
    const produitsNonFiltres = this.produitPort.récupérerLesProduits();
    return filter
      ? produitsNonFiltres.filter(produit => produit.nom.toLowerCase()
        .includes(filter.toLowerCase()))
      : produitsNonFiltres;
  }
}
