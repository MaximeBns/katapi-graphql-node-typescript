import ProduitPort from "../../domain/ports/produitPort";
import Produit from "../../domain/entities/produit";
import TypeORMClient from "../../../../configuration/database/TypeORMClient";
import ProduitTypeORMEntity from "../../../configuration/db/type-orm-entity/produitTypeORMEntity";

export default class DatabaseProduitAdapter implements ProduitPort {
  constructor(private typeORMClient: TypeORMClient) {}

  async sauvegarderProduit(produit: Produit): Promise<void> {
    await this.typeORMClient.executeQuery(db => db.getRepository(ProduitTypeORMEntity).save(ProduitTypeORMEntity.fromProduit(produit)))
  }
}
