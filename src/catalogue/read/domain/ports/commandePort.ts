import CommandeInformations from "../entities/commande/commandeInformations";

export default interface CommandePort {
    sauvegarderCommande(commande: CommandeInformations) : Promise<void>;
    récupérerCommande(id: string): Promise<CommandeInformations>;
    récupérerToutesLesCommandes(): Promise<CommandeInformations[]>;
}