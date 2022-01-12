import TypeORMClient from "../../../configuration/database/TypeORMClient";
import CreerUnProduit from "../usecases/creerUnProduit";
import CreerUneCommande from "../usecases/creerUneCommande";
import {UUIDGenerator} from "../infrastructure/adapter/uuidGenerator";
import DatabaseProduitAdapter from "../infrastructure/adapter/DatabaseProduitAdapter";
import DatabaseCommandeAdapter from "../infrastructure/adapter/DatabaseCommandeAdapter";

export type WriteCatalogueDependenciesContainer = {
    creerUnProduit: CreerUnProduit,
    creerUneCommande: CreerUneCommande
};

export default function createWriteCatalogueDependenciesContainer(
    typeORMClient: TypeORMClient
): WriteCatalogueDependenciesContainer {
    const idGenerator = new UUIDGenerator()
    const produitPort = new DatabaseProduitAdapter(typeORMClient)
    const commandePort = new DatabaseCommandeAdapter(typeORMClient)
    return {
        creerUnProduit : new CreerUnProduit(produitPort, idGenerator),
        creerUneCommande : new CreerUneCommande(commandePort, produitPort, idGenerator)
    }
}