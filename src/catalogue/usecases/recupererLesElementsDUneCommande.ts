import {CommandeElement} from "../domain/entities/commande/commande";
import Produit from "../domain/entities/produit";

class RecupererLesElementsDUneCommande {
    constructor() {
    }

    async exécuter(idCommande: string): Promise<CommandeElement[]> {
        return  [new CommandeElement('id', Produit.creer('idProd', 'Orange', 2, 3), 2)]
    }
}