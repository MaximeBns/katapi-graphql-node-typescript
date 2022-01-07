import CommandePort from "../domain/ports/commandePort";

export default class RecupererLaCommande {
    constructor(private commandePort: CommandePort) {}

    async exécuter(id: string) {
        return await this.commandePort.récupérerCommande(id)
    }
}