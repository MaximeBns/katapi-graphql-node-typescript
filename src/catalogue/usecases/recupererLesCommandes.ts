import CommandePort from "../domain/ports/commandePort";
import {PasDeCommande} from "../domain/errors/PasDeCommande";
import Commande from "../domain/entities/commande/commande";

export default class RecupererLesCommandes {
    constructor(private commandePort: CommandePort) {}

    async exécuter(): Promise<Commande[]> {
        const toutesLesCommandes =  await this.commandePort.récupérerToutesLesCommandes()
        if (!toutesLesCommandes.length) {
            throw new PasDeCommande()
        }
        return toutesLesCommandes
    }
}