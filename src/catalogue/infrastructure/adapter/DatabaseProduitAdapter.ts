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
import TypeORMClient from "../../../configuration/database/TypeORMClient";
import ProduitTypeORMEntity from "../../configuration/db/type-orm-entity/produitTypeORMEntity";

export default class DatabaseProduitAdapter implements ProduitPort {
  constructor(private typeORMClient: TypeORMClient) {}

  async sauvegarderProduit(produit: Produit): Promise<void> {
    await this.typeORMClient.executeQuery(db => db.getRepository(ProduitTypeORMEntity).save(ProduitTypeORMEntity.fromProduit(produit)))
  }

  async récupérerLesProduits(filtre?: FiltreProduit): Promise<Produit[]> {
    // todo : se servir de typeorm directement pour trier les produits
    const produitsDb = await this.typeORMClient.executeQuery(db => db.getRepository(ProduitTypeORMEntity).find())
    if (filtre) {
      return this.filtrerProduits(produitsDb.map(p => p.toProduit()), filtre)
    }
    return produitsDb.map(p => p.toProduit())
  }

  async récupérerLeProduit(id: string): Promise<Produit> {
    const produitDB = await this.typeORMClient.executeQuery(db => db.getRepository(ProduitTypeORMEntity).findOne({id}))
    return produitDB.toProduit()
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

    if (filter.limit)
      produitsFiltré = produitsFiltré.slice(0, filter.limit)

    if (produitsFiltré.length > 0) {
      return produitsFiltré
    } else {
      throw new AucunProduitTrouve(http2.constants.HTTP_STATUS_NOT_FOUND,
          "aucun produits trouvés avec ces paramètres")
    }
  }
}
