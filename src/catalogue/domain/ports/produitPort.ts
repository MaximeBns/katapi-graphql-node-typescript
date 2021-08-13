import Produit from "../entities/produit";

export default interface ProduitPort {
    sauvegarderProduit(produit: Produit): Produit
    récupérerLesProduits(): Array<Produit>
}
