import CommandePort from "../domain/ports/commandePort";
import {PasDeCommande} from "../domain/errors/PasDeCommande";
import CommandeInformations from "../domain/entities/commande/commandeInformations";

export default class RecupererLesCommandes {
    constructor(private commandePort: CommandePort) {}

    async exécuter(): Promise<CommandeInformations[]> {
        const toutesLesCommandes =  await this.commandePort.récupérerToutesLesCommandes()
        if (!toutesLesCommandes.length) {
            throw new PasDeCommande()
        }
        return toutesLesCommandes
    }
}