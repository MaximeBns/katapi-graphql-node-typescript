import CommandePort from "../../domain/ports/commandePort";
import Commande, {CommandeElement, StatutCommande} from "../../domain/entities/commande/commande";
import TypeORMClient from "../../../configuration/database/TypeORMClient";
import CommandeTypeORMEntity from "../../configuration/db/type-orm-entity/commandeTypeORMEntity";
import ElementCommandeTypeORMEntity from "../../configuration/db/type-orm-entity/elementCommandeTypeORMEntity";
import ProduitTypeORMEntity from "../../configuration/db/type-orm-entity/produitTypeORMEntity";
import {CommandeNonTrouvee} from "../../domain/errors/CommandeNonTrouvee";

export default class DatabaseCommandeAdapter implements CommandePort {
    constructor(private typeORMClient: TypeORMClient) {}

    async récupérerCommande(id: string): Promise<Commande> {
        // a splitter en plusieurs adapter pour la partie read
        const commandeAvecElementsDeLaBase = await this.typeORMClient.executeQuery(connection => connection.getRepository(CommandeTypeORMEntity).findOne({id: id}, {relations:['elements']}));
        if (!commandeAvecElementsDeLaBase) {
            throw new CommandeNonTrouvee(id)
        }
        return await this.récupérerLaCommandeEnBase(commandeAvecElementsDeLaBase);
    }

    async récupérerToutesLesCommandes(): Promise<Commande[]> {
        const commandesDeLaBase =  await this.typeORMClient.executeQuery(connection => connection.getRepository(CommandeTypeORMEntity).find())
        return await Promise.all(commandesDeLaBase.map(async commande => Commande.of(commande.id, StatutCommande[commande.statut], commande.poids, commande.fraisDePort, commande.montantTotal)))
    }

    async sauvegarderCommande(commande: Commande): Promise<void> {
        const elementsASauvegarder = commande.elements.map(element => {
            return new ElementCommandeTypeORMEntity(element.id, commande.id, element.produitId, element.quantité)
        })
        const commandeASauvegarder = CommandeTypeORMEntity.fromCommandeAvecElements(commande, elementsASauvegarder)
        await this.typeORMClient.executeQuery(connection => connection.getRepository(CommandeTypeORMEntity).save(commandeASauvegarder))
    }

    private async récupérerLaCommandeEnBase(commandeAvecElementsDeLaBase: CommandeTypeORMEntity): Promise<Commande> {
        const commande = Commande.init(commandeAvecElementsDeLaBase.id)
        const elements = await Promise.all(commandeAvecElementsDeLaBase.elements.map(async element => this.récupérerElement(element)))
        elements.forEach(element => commande.ajouterElement(element.id, element.produit, element.quantité))
        return commande
    }

    private async récupérerElement(elementDeLaBase: ElementCommandeTypeORMEntity): Promise<CommandeElement> {
        const produitDeLaBase =  await this.typeORMClient.executeQuery(connection => connection.getRepository(ProduitTypeORMEntity).findOne({id: elementDeLaBase.produitId}))
        return new CommandeElement(elementDeLaBase.id, produitDeLaBase.toProduit(), elementDeLaBase.quantité)
    }
}