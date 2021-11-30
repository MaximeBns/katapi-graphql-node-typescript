import ProduitPort from "../../domain/ports/produitPort";
import Produit from "../../domain/entities/produit";
import {
  CompareSign,
  FilteredProductFilled,
  FiltreProduit,
  OrderType
} from "../../usecases/recupererLesProduits/filtreProduit";
import {AucunProduitTrouve} from "../../domain/errors/AucunProduitTrouve";
import http2 from "http2";
import {Result} from "../../../shared/infrastructure/result";
import {Edge} from "../../../shared/infrastructure/edge";

export default class ProduitAdapter implements ProduitPort {
  listeProduit: Produit[]

  constructor() {
    this.listeProduit = []
  }

  sauvegarderProduit(produit: Produit): Produit {
    this.listeProduit.push(produit)
    return produit
  }

  récupérerLesProduits(filtre?: FiltreProduit): Result<Produit> {
    let produits : Array<Produit>
    if (filtre) {
       produits = this.filtrerProduits(this.listeProduit, filtre)
    } else {
       produits = this.listeProduit
    }
    // count total number of product
    const totalProduits = this.listeProduit.length

    //create product edge
    const produitsEdge = produits.map((produit): Edge<Produit> => ({node: produit, cursor: produit.id}))

    const produitsResult: Result<Produit> = {
      totalCount: totalProduits,
      edges: produitsEdge,
      pageInfo: {
        hasNextPage: false,
        startCursor: produitsEdge[produitsEdge.length-1].cursor,
      }
    }

    return produitsResult
  }

  private filtrerProduits(produitsNonFiltres: Array<Produit>, filter: FiltreProduit): Array<Produit> {
    let produitsFiltré: Array<Produit> = produitsNonFiltres
    switch (filter.by) {
      case FilteredProductFilled.Name:

        //ORDER
        if (filter.order == OrderType.Asc)
          produitsFiltré = produitsFiltré.sort((a, b) => a.nom.localeCompare(b.nom))
        else
          produitsFiltré = produitsFiltré.sort((a, b) => a.nom.localeCompare(b.nom)).reverse()

        //START WITH
        if (filter.contains)
          produitsFiltré = produitsFiltré.filter(produit => produit.nom.toLowerCase().includes(filter.contains))

        break
      case FilteredProductFilled.Poids:

        //ORDER
        if (filter.order == OrderType.Asc)
          produitsFiltré = produitsFiltré.sort((a, b) => a.poids - b.poids)
        else
          produitsFiltré = produitsFiltré.sort((a, b) => a.poids - b.poids).reverse()

        //START WITH
        if (filter.contains)
          produitsFiltré = produitsFiltré.filter(produit => produit.nom.toLowerCase().includes(filter.contains))

        break
      case FilteredProductFilled.Prix:

        //Compare
        if (filter.compare) {
          switch (filter.compare.sign) {
            case CompareSign.Greater:
              produitsFiltré = produitsFiltré.filter(produit => produit.prix > filter.compare.than)
              break
            case CompareSign.GreaterOrEqual:
              produitsFiltré = produitsFiltré.filter(produit => produit.prix >= filter.compare.than)
              break
            case CompareSign.Lower:
              produitsFiltré = produitsFiltré.filter(produit => produit.prix < filter.compare.than)
              break;
            case CompareSign.LowerOrEqual:
              produitsFiltré = produitsFiltré.filter(produit => produit.prix <= filter.compare.than)
              break;
          }
        }
        //ORDER
        if (filter.order == OrderType.Asc)
          produitsFiltré = produitsFiltré.sort((a, b) => a.prix - b.prix)
        else
          produitsFiltré = produitsFiltré.sort((a, b) => a.prix - b.prix).reverse()

        //START WITH
        if (filter.contains)
          produitsFiltré = produitsFiltré.filter(produit => produit.nom.toLowerCase().includes(filter.contains))
        break
    }

    //Todo (rede) : replace with start and cursor
    if (filter.first && filter.afterCursor) {
      const cursorIndex = produitsFiltré.findIndex((produit) => produit.id === filter.afterCursor)
      produitsFiltré = produitsFiltré.slice(cursorIndex, cursorIndex + filter.first)
    }

    if (produitsFiltré.length > 0) {
      return produitsFiltré
    } else {
      throw new AucunProduitTrouve(http2.constants.HTTP_STATUS_NOT_FOUND,
        "aucun produits trouvés avec ces paramètres")
    }
  }

  récupérerLeProduit(id: string): Produit {
    return this.listeProduit.find(produit => produit.id === id)
  }
}
