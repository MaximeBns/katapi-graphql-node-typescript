import Produit from "../entities/produit";
import {FiltreProduit} from "../../usecases/recupererLesProduits/filtreProduit";

export default interface ProduitPort {
    sauvegarderProduit(produit: Produit): void
    récupérerLesProduits(filtre?: FiltreProduit): Promise<Produit[]>
    récupérerLeProduit(id:string): Promise<Produit>
}
