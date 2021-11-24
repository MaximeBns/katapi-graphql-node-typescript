import CommandePort from "../domain/ports/commandePort";
import ProduitPort from "../domain/ports/produitPort";
import Commande from "../domain/entities/commande/commande";
import {IdGenerator} from "../domain/ports/idGenerator";

export type CommandeElementDepuisRequete = Readonly<{
    idProduit: string;
    quantite: number
}>;

export default class CreerUneCommande {
    constructor(private commandePort: CommandePort, private produitPort: ProduitPort, private idGenerator: IdGenerator) {}

    exécuter(elements: CommandeElementDepuisRequete[]): Commande {
        const commande = Commande.init(this.idGenerator.generate())
        elements.forEach((elementDepuisRequete) => {
            const produit = this.produitPort.récupérerLeProduit(elementDepuisRequete.idProduit)
            commande.ajouterElement(produit, elementDepuisRequete.quantite)
        })
        this.commandePort.sauvegarderCommande(commande)
        return commande
    }
}