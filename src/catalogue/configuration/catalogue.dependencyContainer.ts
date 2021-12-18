import RecupererLeProduit from "../usecases/recupererLeProduit";
import RecupererLesProduits from "../usecases/recupererLesProduits/recupererLesProduits";
import CreerUnProduit from "../usecases/creerUnProduit";
import ProduitPort from "../domain/ports/produitPort";
import ProduitAdapter from "../infrastructure/adapter/ProduitAdapter";
import RecupererLaCommande from "../usecases/recupererLaCommande";
import RecupererLesCommandes from "../usecases/recupererLesCommandes";
import CreerUneCommande from "../usecases/creerUneCommande";
import CommandeAdapter from "../infrastructure/adapter/commandeAdapter";
import {UUIDGenerator} from "../infrastructure/adapter/uuidGenerator";


export type CatalogueDependencyContainer = {
  recupererLeProduit: RecupererLeProduit,
  recupererLesProduits: RecupererLesProduits,
  creerUnProduit: CreerUnProduit,
  recupererLaCommande: RecupererLaCommande,
  recupererLesCommandes: RecupererLesCommandes,
  creerUneCommande: CreerUneCommande
};

export default function createCatalogueDependencyContainer(): CatalogueDependencyContainer {
  const produitPort = new ProduitAdapter()
  const commandePort = new CommandeAdapter()
  const idGenerator = new UUIDGenerator()
  const recupererLeProduit = new RecupererLeProduit(produitPort)
  const recupererLesProduits = new RecupererLesProduits(produitPort)
  const creerUnProduit = new CreerUnProduit(produitPort, idGenerator)
  const recupererLaCommande = new RecupererLaCommande(commandePort)
  const recupererLesCommandes = new RecupererLesCommandes(commandePort)
  const creerUneCommande = new CreerUneCommande(commandePort, produitPort, idGenerator)
  return {
    recupererLeProduit,
    recupererLesProduits,
    creerUnProduit,
    recupererLaCommande,
    recupererLesCommandes,
    creerUneCommande
  }
}
