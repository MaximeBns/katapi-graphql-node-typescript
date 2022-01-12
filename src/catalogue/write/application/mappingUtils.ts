import {CommandeOutputApi, ElementCommandeOutputApi} from "../../application/commande/CommandeOutputApi";
import Commande, {CommandeElement} from "../domain/entities/commande/commande";
import Produit from "../domain/entities/produit";

export function commandeVersCommandeOutputApi(commande: Commande): CommandeOutputApi {
    return {
        __typename: 'Commande',
        id: commande.id,
        statut: commande.statut,
        elements: commande.elements.map(elementCommandeVersElementCommandeOuputApi),
        fraisDePort: commande.fraisDePort,
        montantTotal: commande.montantTotal,
        poids: commande.poids
    }
}

function elementCommandeVersElementCommandeOuputApi(element: CommandeElement): ElementCommandeOutputApi {
    return {
        produit: produitVersProduitOutputApi(element.produit),
        quantite: element.quantité
    }
}

function produitVersProduitOutputApi(produit: Produit) {
    return {
        id: produit.id,
        nom: produit.nom,
        prix: produit.prix,
        poids: produit.poids
    }
}