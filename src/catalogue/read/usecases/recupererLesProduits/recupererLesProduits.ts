import ProduitPort from "../../domain/ports/produitPort";
import ProduitInformations from "../../domain/entities/produitInformations";
import {CompareSign, FilteredProductFilled, FiltreProduit, OrderType} from "./filtreProduit";
import {AucunProduitTrouve} from "../../domain/errors/AucunProduitTrouve";
import * as http2 from "http2";

export default class RecupererLesProduits {
  constructor(private produitPort: ProduitPort) { // Ça ne nous plaît pas du tout mais on demande le type ProduitAdapter ici à la place du ProduitPort car TypeDi ne sait pas gérer les interfaces (car elles ne sont pas transpilées en JS)
    this.produitPort = produitPort;        // https://github.com/typestack/typedi/issues/70
  }

  async exécuter(filter?: FiltreProduit): Promise<ProduitInformations[]> {
    return await this.produitPort.récupérerLesProduits(filter);
  }
}
