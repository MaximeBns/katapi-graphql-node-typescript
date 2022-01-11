import CommandePort from "../../domain/ports/commandePort";
import Commande from "../../domain/entities/commande/commande";
import TypeORMClient from "../../../../configuration/database/TypeORMClient";
import ElementCommandeTypeORMEntity from "../../../configuration/db/type-orm-entity/elementCommandeTypeORMEntity";
import CommandeTypeORMEntity from "../../../configuration/db/type-orm-entity/commandeTypeORMEntity";

export default class DatabaseCommandeAdapter implements CommandePort {
    constructor(private typeORMClient: TypeORMClient) {}

    async sauvegarderCommande(commande: Commande): Promise<void> {
        const elementsASauvegarder = commande.elements.map(element => {
            return new ElementCommandeTypeORMEntity(element.id, commande.id, element.produitId, element.quantité)
        })
        const commandeASauvegarder = CommandeTypeORMEntity.fromCommandeAvecElements(commande, elementsASauvegarder)
        await this.typeORMClient.executeQuery(connection => connection.getRepository(CommandeTypeORMEntity).save(commandeASauvegarder))
    }
}