import Commande from "../../catalogue/domain/entities/commande/commande";
import Produit from "../../catalogue/domain/entities/produit";

export function uneCommandeAvecDeuxPommesEtTroisPoires() : Commande {
    const commande = Commande.init('id')
    const pomme: Produit = {id:'1', nom: 'Pomme', prix: 2, poids: 0.2}
    const poire: Produit = {id:'2', nom: 'Poire', prix: 3, poids: 0.25}
    commande.ajouterElement(pomme, 2)
    commande.ajouterElement(poire, 3)
    return commande
}