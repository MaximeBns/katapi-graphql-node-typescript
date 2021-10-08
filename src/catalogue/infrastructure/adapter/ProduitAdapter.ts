import ProduitPort from "../../domain/ports/produitPort";
import Produit from "../../domain/entities/produit";
import { Service } from "typedi";
import {Connection} from "typeorm";

@Service()
export default class ProduitAdapter implements ProduitPort {
    listeProduit: Produit[]
    constructor(connection: Connection) {
    }

    sauvegarderProduit(produit: Produit): Produit {
        this.listeProduit.push(produit)
        return produit
    }

    récupérerLesProduits(filter?: string, offset?: number, limit?: number): Array<Produit> {
        return this.listeProduit
    }

    récupérerLeProduit(id:string): Produit {
        return this.listeProduit.find(produit => produit.id === id)
    }
}
