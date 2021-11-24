import CommandePort from "../../domain/ports/commandePort";
import Commande from "../../domain/entities/commande/commande";
import {CommandeNonTrouvee} from "../../domain/errors/CommandeNonTrouvee";

export default class CommandeAdapter implements CommandePort {
    commandes: Commande[]

    constructor() {
        this.commandes = []
    }

    sauvegarderCommande(commande: Commande): void {
        this.commandes.push(commande)
    }

    récupérerCommande(id: string): Commande {
        const commande =  this.commandes.find(commande => commande.id === id)
        if (!commande) {
            throw new CommandeNonTrouvee(id)
        }
        return commande
    }

    récupérerToutesLesCommandes(): Commande[] {
        return this.commandes
    }
}