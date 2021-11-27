import CommandePort from "../domain/ports/commandePort";

export default class RecupererLaCommande {
    constructor(private commandePort: CommandePort) {}

    exécuter(id: string) {
        return this.commandePort.récupérerCommande(id)
    }
}