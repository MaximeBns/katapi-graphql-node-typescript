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
import {Connection} from "typeorm";
import TypeORMClient from "../../../configuration/database/TypeORMClient";
import ProduitTypeORMEntity from "../../configuration/db/type-orm-entity/produitTypeORMEntity";

export default class DatabaseProduitAdapter implements ProduitPort {
  listeProduit: Produit[]

  constructor(private typeORMClient: TypeORMClient) {
    this.listeProduit = []
  }

  async sauvegarderProduit(produit: Produit): Promise<void> {
    await this.typeORMClient.executeQuery(db => db.getRepository(ProduitTypeORMEntity).save(ProduitTypeORMEntity.fromProduit(produit)))
  }

  async récupérerLesProduits(filtre?: FiltreProduit): Promise<Produit[]> {
    const produitsDb = await this.typeORMClient.executeQuery(db => db.getRepository(ProduitTypeORMEntity).find())
    return produitsDb.map(p => p.toProduit)
  }

  async récupérerLeProduit(id: string): Promise<Produit> {
    const produitDB = await this.typeORMClient.executeQuery(db => db.getRepository(ProduitTypeORMEntity).findOne({id}))
    return produitDB.toProduit
  }

}
