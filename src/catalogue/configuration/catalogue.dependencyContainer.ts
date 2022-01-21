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
import { RecupererLesElementsDUneCommande } from "../usecases/recupererLesElementsDUneCommande";


export type CatalogueDependencyContainer = {
  recupererLeProduit: RecupererLeProduit,
  recupererLesProduits: RecupererLesProduits,
  creerUnProduit: CreerUnProduit,
  recupererLaCommande: RecupererLaCommande,
  recupererLesCommandes: RecupererLesCommandes,
  creerUneCommande: CreerUneCommande,
  recupererLesElementsDUneCommande: RecupererLesElementsDUneCommande,
};

export default function createCatalogueDependencyContainer(): CatalogueDependencyContainer {
  const idGenerator = new UUIDGenerator()
  const typeORMClient = new TypeORMClient(createPostgresConnection())
  const produitPort = new DatabaseProduitAdapter(typeORMClient)
  const commandePort = new DatabaseCommandeAdapter(typeORMClient)
  return {
    recupererLeProduit : new RecupererLeProduit(produitPort),
    recupererLesProduits : new RecupererLesProduits(produitPort),
    creerUnProduit : new CreerUnProduit(produitPort, idGenerator),
    recupererLaCommande : new RecupererLaCommande(commandePort),
    recupererLesCommandes : new RecupererLesCommandes(commandePort),
    creerUneCommande : new CreerUneCommande(commandePort, produitPort, idGenerator),
    recupererLesElementsDUneCommande : new RecupererLesElementsDUneCommande()
  }
}
