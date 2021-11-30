import Produit from "../entities/produit";
import {FiltreProduit} from "../../usecases/recupererLesProduits/filtreProduit";
import {Result} from "../../../shared/infrastructure/result";

export default interface ProduitPort {
    sauvegarderProduit(produit: Produit): Produit
    récupérerLesProduits(filtre?: FiltreProduit): Result<Produit>
    récupérerLeProduit(id:string): Produit
}
