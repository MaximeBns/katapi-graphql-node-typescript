import ProduitInformations from "../entities/produitInformations";
import {FiltreProduit} from "../../usecases/recupererLesProduits/filtreProduit";

export default interface ProduitPort {
    récupérerLesProduits(filtre?: FiltreProduit): Promise<ProduitInformations[]>
    récupérerLeProduit(id:string): Promise<ProduitInformations>
}
