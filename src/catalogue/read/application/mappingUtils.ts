import {CommandeOutputApi, ElementCommandeOutputApi} from "../../application/commande/CommandeOutputApi";
import CommandeInformations, {CommandeElementInformations} from "../domain/entities/commande/commandeInformations";
import ProduitInformations from "../domain/entities/produitInformations";

export function commandeInformationsVersCommandeOutputApi(commande: CommandeInformations): CommandeOutputApi {
    return {
        __typename: 'Commande',
        id: commande.id,
        statut: commande.statut,
        elements: commande.elements.map(commandeElementInformationsVersElementCommandeOuputApi),
        fraisDePort: commande.fraisDePort,
        montantTotal: commande.montantTotal,
        poids: commande.poids
    }
}

function commandeElementInformationsVersElementCommandeOuputApi(element: CommandeElementInformations): ElementCommandeOutputApi {
    return {
        produit: produitInformationsVersProduitOutputApi(element.produit),
        quantite: element.quantité
    }
}

function produitInformationsVersProduitOutputApi(produit: ProduitInformations) {
    return {
        id: produit.id,
        nom: produit.nom,
        prix: produit.prix,
        poids: produit.poids
    }
}