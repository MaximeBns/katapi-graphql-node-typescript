import RecupererLeProduit from "../usecases/recupererLeProduit";
import RecupererLesProduits from "../usecases/recupererLesProduits/recupererLesProduits";
import CreerUnProduit from "../usecases/creerUnProduit";
import RecupererLaCommande from "../usecases/recupererLaCommande";
import RecupererLesCommandes from "../usecases/recupererLesCommandes";
import CreerUneCommande from "../usecases/creerUneCommande";
import {UUIDGenerator} from "../infrastructure/adapter/uuidGenerator";
import DatabaseProduitAdapter from "../infrastructure/adapter/DatabaseProduitAdapter";
import TypeORMClient from "../../configuration/database/TypeORMClient";
import {createPostgresConnection} from "../../configuration/database/createPostgresConnection";
import DatabaseCommandeAdapter from "../infrastructure/adapter/DatabaseCommandeAdapter";


export type CatalogueDependencyContainer = {
  recupererLeProduit: RecupererLeProduit,
  recupererLesProduits: RecupererLesProduits,
  creerUnProduit: CreerUnProduit,
  recupererLaCommande: RecupererLaCommande,
  recupererLesCommandes: RecupererLesCommandes,
  creerUneCommande: CreerUneCommande
};

export default function createCatalogueDependencyContainer(): CatalogueDependencyContainer {
  const idGenerator = new UUIDGenerator()
  const typeORMClient = new TypeORMClient(createPostgresConnection())
  const produitPort = new DatabaseProduitAdapter(typeORMClient)
  const commandePort = new DatabaseCommandeAdapter(typeORMClient)
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
