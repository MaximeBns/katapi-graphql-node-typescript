import Commande from "../entities/commande/commande";

export default interface CommandePort {
    sauvegarderCommande(commande: Commande) : Promise<void>;
}