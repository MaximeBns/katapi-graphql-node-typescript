import CommandePort from "../domain/ports/commandePort";
import {PasDeCommande} from "../domain/errors/PasDeCommande";

export default class RecupererLesCommandes {
    constructor(private commandePort: CommandePort) {}

    exécuter() {
        const toutesLesCommandes =  this.commandePort.récupérerToutesLesCommandes()
        if (!toutesLesCommandes.length) {
            throw new PasDeCommande()
        }
        return toutesLesCommandes
    }
}