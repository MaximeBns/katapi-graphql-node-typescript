import CommandePort from "../../domain/ports/commandePort";
import Commande from "../../domain/entities/commande/commande";
import TypeORMClient from "../../../configuration/database/TypeORMClient";
import CommandeTypeORMEntity from "../../configuration/db/type-orm-entity/commandeTypeORMEntity";
import ElementCommandeTypeORMEntity from "../../configuration/db/type-orm-entity/elementCommandeTypeORMEntity";
import {IdGenerator} from "../../domain/ports/idGenerator";

export default class DatabaseCommandeAdapter implements CommandePort {
    constructor(private typeORMClient: TypeORMClient, private idGenerator: IdGenerator) {}

    récupérerCommande(id: string): Promise<Commande> {
        return Promise.resolve(undefined);
    }

    récupérerToutesLesCommandes(): Promise<Commande[]> {
        return Promise.resolve([]);
    }

    async sauvegarderCommande(commande: Commande): Promise<void> {
        const elementsASauvegarder = commande.elements.map(element => {
            console.log('plop');
            return new ElementCommandeTypeORMEntity(this.idGenerator.generate(), commande.id, element.produitId, element.quantité)
        })
        const commandeASauvegarder = CommandeTypeORMEntity.fromCommandeAvecElements(commande, elementsASauvegarder)
        console.log(commandeASauvegarder);
        await this.typeORMClient.executeQuery(connection => connection.getRepository(CommandeTypeORMEntity).save(commandeASauvegarder))
    }
}