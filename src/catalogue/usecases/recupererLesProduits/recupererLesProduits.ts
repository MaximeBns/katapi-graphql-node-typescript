import ProduitPort from "../../domain/ports/produitPort";
import Produit from "../../domain/entities/produit";
import {FilteredProductFilled, FiltreProduit, OrderType} from "./filtreProduit";

export default class RecupererLesProduits {
  constructor(private produitPort: ProduitPort) { // Ça ne nous plaît pas du tout mais on demande le type ProduitAdapter ici à la place du ProduitPort car TypeDi ne sait pas gérer les interfaces (car elles ne sont pas transpilées en JS)
    this.produitPort = produitPort;        // https://github.com/typestack/typedi/issues/70
  }

  exécuter(filter?: FiltreProduit): Array<Produit> {
    const produitsNonFiltres = this.produitPort.récupérerLesProduits();
    let produitFiltréParNom: Produit[] = produitsNonFiltres
    if (filter) {
      switch (filter.by) {
        case FilteredProductFilled.Name:

          //ORDER
          if (filter.order == OrderType.Asc)
            produitFiltréParNom = produitFiltréParNom.sort((a, b) => a.nom.localeCompare(b.nom))
          else
            produitFiltréParNom = produitFiltréParNom.sort((a, b) => a.nom.localeCompare(b.nom)).reverse()

          //START WITH
          if (filter.contains)
            produitFiltréParNom = produitFiltréParNom.filter(produit => produit.nom.toLowerCase().includes(filter.contains))

          if (filter.limit)
            return produitFiltréParNom.slice(0, filter.limit)

          return produitFiltréParNom

        case FilteredProductFilled.Poids:

          //ORDER
          if (filter.order == OrderType.Asc)
            produitFiltréParNom = produitFiltréParNom.sort((a, b) => a.poids - b.poids)
          else
            produitFiltréParNom = produitFiltréParNom.sort((a, b) => a.poids - b.poids).reverse()

          //START WITH
          if (filter.contains)
            produitFiltréParNom = produitFiltréParNom.filter(produit => produit.nom.toLowerCase().includes(filter.contains))

          if (filter.limit)
            return produitFiltréParNom.slice(0, filter.limit)

          return produitFiltréParNom

        case FilteredProductFilled.Prix:

          //ORDER
          if (filter.order == OrderType.Asc)
            produitFiltréParNom = produitFiltréParNom.sort((a, b) => a.prix - b.prix)
          else
            produitFiltréParNom = produitFiltréParNom.sort((a, b) => a.prix - b.prix).reverse()

          //START WITH
          if (filter.contains)
            produitFiltréParNom = produitFiltréParNom.filter(produit => produit.nom.toLowerCase().includes(filter.contains))

          if (filter.limit)
            return produitFiltréParNom.slice(0, filter.limit)

          return produitFiltréParNom

      }
    }
    return produitsNonFiltres
  }
}
