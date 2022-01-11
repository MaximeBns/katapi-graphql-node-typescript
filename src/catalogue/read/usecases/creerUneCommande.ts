import CommandePort from "../domain/ports/commandePort";
import ProduitPort from "../domain/ports/produitPort";
import CommandeInformations from "../domain/entities/commande/commandeInformations";
import {IdGenerator} from "../domain/ports/idGenerator";

export type CommandeElementDepuisRequete = Readonly<{
    idProduit: string;
    quantite: number
}>;

export default class CreerUneCommande {
    constructor(private commandePort: CommandePort, private produitPort: ProduitPort, private idGenerator: IdGenerator) {}

    async exécuter(elementDepuisRequete: CommandeElementDepuisRequete[]): Promise<CommandeInformations> {
        const commande = CommandeInformations.init(this.idGenerator.generate())
        await Promise.all(elementDepuisRequete.map(elementDepuisRequete => this.ajouterElementALaCommande(commande, elementDepuisRequete)))
        this.commandePort.sauvegarderCommande(commande)
        return commande
    }

    private async ajouterElementALaCommande(commande: CommandeInformations, elementDepuisRequete: CommandeElementDepuisRequete): Promise<void> {
        const produit = await this.produitPort.récupérerLeProduit(elementDepuisRequete.idProduit)
        commande.ajouterElement(this.idGenerator.generate(), produit, elementDepuisRequete.quantite)
    }
}