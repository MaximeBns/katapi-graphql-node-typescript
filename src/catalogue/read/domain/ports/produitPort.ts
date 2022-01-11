import ProduitInformations from "../entities/produitInformations";
import {FiltreProduit} from "../../usecases/recupererLesProduits/filtreProduit";

export default interface ProduitPort {
    sauvegarderProduit(produit: ProduitInformations): void
    récupérerLesProduits(filtre?: FiltreProduit): Promise<ProduitInformations[]>
    récupérerLeProduit(id:string): Promise<ProduitInformations>
}
