export class CommandeNonTrouvee extends Error {
    constructor(id: string) {
        super(`La commande avec l'id ${id} n'existe pas`);
    }
}