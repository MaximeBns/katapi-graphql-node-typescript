export class PasDeCommande extends Error {
    constructor() {
        super('Aucune commande n\'a été trouvée');
    }
}