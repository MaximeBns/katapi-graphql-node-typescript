import Commande from "../entities/commande/commande";

export default interface CommandePort {
    sauvegarderCommande(commande: Commande) : void;
    récupérerCommande(id: string): Commande;
    récupérerToutesLesCommandes(): Commande[];
}