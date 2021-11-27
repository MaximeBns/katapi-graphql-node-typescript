import Commande, {CommandeElement} from "../../domain/entities/commande/commande";
import {CommandeOutputApi, ElementCommandeOutputApi} from "../commande/CommandeOutputApi";
import Produit from "../../domain/entities/produit";

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