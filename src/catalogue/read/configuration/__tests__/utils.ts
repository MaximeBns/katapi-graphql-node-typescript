import ProduitInformations from "../../domain/entities/produitInformations";
import CommandeInformations from "../../domain/entities/commande/commandeInformations";

export function unePomme() : ProduitInformations {
    return {id:'1', nom: 'Pomme', prix: 2, poids: 0.2}
}

export function unePoire(): ProduitInformations {
    return {id:'2', nom: 'Poire', prix: 3, poids: 0.25}
}

export function uneCommandeAvecDeuxPommesEtTroisPoires() : CommandeInformations {
    const commande = CommandeInformations.init('id')
    commande.ajouterElement('id-el-1', unePomme(), 2)
    commande.ajouterElement('id-el-2', unePoire(), 3)
    return commande
}