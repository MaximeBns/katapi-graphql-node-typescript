import ProduitPort from "../../domain/ports/produitPort";
import Produit from "../../domain/entities/produit";
import {CompareSign, FilteredProductFilled, FiltreProduit, OrderType} from "./filtreProduit";
import {AucunProduitTrouve} from "../../domain/errors/AucunProduitTrouve";
import * as http2 from "http2";
import {Result} from "../../../shared/infrastructure/result";

export default class RecupererLesProduits {
  constructor(private produitPort: ProduitPort) { // Ça ne nous plaît pas du tout mais on demande le type ProduitAdapter ici à la place du ProduitPort car TypeDi ne sait pas gérer les interfaces (car elles ne sont pas transpilées en JS)
    this.produitPort = produitPort;        // https://github.com/typestack/typedi/issues/70
  }

  exécuter(filter?: FiltreProduit): Result<Produit> {
    return this.produitPort.récupérerLesProduits(filter);
  }
}
