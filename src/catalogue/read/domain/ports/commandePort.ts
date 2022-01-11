import CommandeInformations from "../entities/commande/commandeInformations";

export default interface CommandePort {
    récupérerCommande(id: string): Promise<CommandeInformations>;
    récupérerToutesLesCommandes(): Promise<CommandeInformations[]>;
}