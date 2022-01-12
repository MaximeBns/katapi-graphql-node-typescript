import TypeORMClient from "../../../configuration/database/TypeORMClient";
import RecupererLeProduit from "../usecases/recupererLeProduit";
import RecupererLesProduits from "../usecases/recupererLesProduits/recupererLesProduits";
import RecupererLaCommande from "../usecases/recupererLaCommande";
import RecupererLesCommandes from "../usecases/recupererLesCommandes";
import DatabaseProduitAdapter from "../infrastructure/adapter/DatabaseProduitAdapter";
import DatabaseCommandeAdapter from "../infrastructure/adapter/DatabaseCommandeAdapter";

export type ReadCatalogueDependenciesContainer = {
    recupererLeProduit: RecupererLeProduit,
    recupererLesProduits: RecupererLesProduits,
    recupererLaCommande: RecupererLaCommande,
    recupererLesCommandes: RecupererLesCommandes,
};

export default function createReadCatalogueDependenciesContainer(
    typeORMClient: TypeORMClient
): ReadCatalogueDependenciesContainer {
    const produitPort = new DatabaseProduitAdapter(typeORMClient)
    const commandePort = new DatabaseCommandeAdapter(typeORMClient)
    return {
        recupererLeProduit : new RecupererLeProduit(produitPort),
        recupererLesProduits : new RecupererLesProduits(produitPort),
        recupererLaCommande : new RecupererLaCommande(commandePort),
        recupererLesCommandes : new RecupererLesCommandes(commandePort),
    }
}