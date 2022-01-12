import CommandePort from "../../domain/ports/commandePort";
import CommandeInformations, {CommandeElementInformations} from "../../domain/entities/commande/commandeInformations";
import {CommandeNonTrouvee} from "../../domain/errors/CommandeNonTrouvee";
import TypeORMClient from "../../../../configuration/database/TypeORMClient";
import CommandeTypeORMEntity from "../../../configuration/db/type-orm-entity/commandeTypeORMEntity";
import ElementCommandeTypeORMEntity from "../../../configuration/db/type-orm-entity/elementCommandeTypeORMEntity";
import ProduitTypeORMEntity from "../../../configuration/db/type-orm-entity/produitTypeORMEntity";

export default class DatabaseCommandeLoader implements CommandePort {
    constructor(private typeORMClient: TypeORMClient) {}

    async récupérerCommande(id: string): Promise<CommandeInformations> {
        // a splitter en plusieurs adapter pour la partie read
        const commandeAvecElementsDeLaBase = await this.typeORMClient.executeQuery(connection => connection.getRepository(CommandeTypeORMEntity).findOne({id: id}, {relations:['elements']}));
        if (!commandeAvecElementsDeLaBase) {
            throw new CommandeNonTrouvee(id)
        }
        return await this.récupérerLaCommandeEnBase(commandeAvecElementsDeLaBase);
    }

    async récupérerToutesLesCommandes(): Promise<CommandeInformations[]> {
        const commandesDeLaBase =  await this.typeORMClient.executeQuery(connection => connection.getRepository(CommandeTypeORMEntity).find({relations:['elements']}))
        return await Promise.all(commandesDeLaBase.map(async commande => this.récupérerLaCommandeEnBase(commande)))
    }

    private async récupérerLaCommandeEnBase(commandeAvecElementsDeLaBase: CommandeTypeORMEntity): Promise<CommandeInformations> {
        const commande = CommandeInformations.init(commandeAvecElementsDeLaBase.id)
        const elements = await Promise.all(commandeAvecElementsDeLaBase.elements.map(async element => this.récupérerElement(element)))
        elements.forEach(element => commande.ajouterElement(element.id, element.produit, element.quantité))
        return commande
    }

    private async récupérerElement(elementDeLaBase: ElementCommandeTypeORMEntity): Promise<CommandeElementInformations> {
        const produitDeLaBase =  await this.typeORMClient.executeQuery(connection => connection.getRepository(ProduitTypeORMEntity).findOne({id: elementDeLaBase.produitId}))
        return new CommandeElementInformations(elementDeLaBase.id, produitDeLaBase.toProduitInformations(), elementDeLaBase.quantité)
    }
}