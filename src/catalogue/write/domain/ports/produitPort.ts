import Produit from "../entities/produit";
import ProduitInformations from "../../../read/domain/entities/produitInformations";

export default interface ProduitPort {
    sauvegarderProduit(produit: Produit): void
    récupérerLeProduit(id: string): Promise<ProduitInformations>
}
