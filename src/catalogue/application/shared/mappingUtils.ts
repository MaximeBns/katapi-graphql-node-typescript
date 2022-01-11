import {CommandeOutputApi, ElementCommandeOutputApi} from "../commande/CommandeOutputApi";
import Commande, {CommandeElement} from "../../write/domain/entities/commande/commande";
import Produit from "../../write/domain/entities/produit";


// WRITE
export function toCommandeOutputApi(commande: Commande): CommandeOutputApi {
    return {
        __typename: 'Commande',
        id: commande.id,
        statut: commande.statut,
        elements: commande.elements.map(toElementCommandeOuputApi),
        fraisDePort: commande.fraisDePort,
        montantTotal: commande.montantTotal,
        poids: commande.poids
    }
}

function toElementCommandeOuputApi(element: CommandeElement): ElementCommandeOutputApi {
    return {
        produit: toProduitOutputApi(element.produit),
        quantite: element.quantité
    }
}

function toProduitOutputApi(produit: Produit) {
    return {
        id: produit.id,
        nom: produit.nom,
        prix: produit.prix,
        poids: produit.poids
    }
}