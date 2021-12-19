import CommandePort from "../../domain/ports/commandePort";
import Commande from "../../domain/entities/commande/commande";
import {CommandeNonTrouvee} from "../../domain/errors/CommandeNonTrouvee";

export default class CommandeAdapter implements CommandePort {
    commandes: Commande[]

    constructor() {
        this.commandes = []
    }

    async sauvegarderCommande(commande: Commande): Promise<void> {
        this.commandes.push(commande)
    }

    async récupérerCommande(id: string): Promise<Commande> {
        const commande =  this.commandes.find(commande => commande.id === id)
        if (!commande) {
            throw new CommandeNonTrouvee(id)
        }
        return  commande
    }

    async récupérerToutesLesCommandes(): Promise<Commande[]> {
        return this.commandes
    }
}