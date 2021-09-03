import ProduitPort from "../domain/ports/produitPort";
import Produit from "../domain/entities/produit";
import { Service } from "typedi";
import ProduitAdapter from "../infrastructure/adapter/ProduitAdapter";

@Service()
export default class RecupererLeProduit {
  produitPort: ProduitPort;

  constructor(produitPort: ProduitAdapter) { // Ça ne nous plaît pas du tout mais on demande le type ProduitAdapter ici à la place du ProduitPort car TypeDi ne sait pas gérer les interfaces (car elles ne sont pas transpilées en JS)
    this.produitPort = produitPort;        // https://github.com/typestack/typedi/issues/70
  }

  exécuter(id:string): Produit {
    return this.produitPort.récupérerLeProduit(id);
  }
}
