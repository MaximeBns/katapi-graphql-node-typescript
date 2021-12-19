import Commande from "../../catalogue/domain/entities/commande/commande";
import Produit from "../../catalogue/domain/entities/produit";

export function unePomme() : Produit {
    return {id:'1', nom: 'Pomme', prix: 2, poids: 0.2}
}

export function unePoire(): Produit {
    return {id:'2', nom: 'Poire', prix: 3, poids: 0.25}
}

export function uneCommandeAvecDeuxPommesEtTroisPoires() : Commande {
    const commande = Commande.init('id')
    commande.ajouterElement(unePomme(), 2)
    commande.ajouterElement(unePoire(), 3)
    return commande
}