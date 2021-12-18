import CommandePort from "../../../domain/ports/commandePort";
import CommandeAdapter from "../commandeAdapter";
import {uneCommandeAvecDeuxPommesEtTroisPoires} from "../../../../configuration/__tests__/utils";
import {CommandeNonTrouvee} from "../../../domain/errors/CommandeNonTrouvee";
import Commande from "../../../domain/entities/commande/commande";
import assert from "assert";

describe('CommandeAdapter', () => {
    let commandeAdapter: CommandePort

    beforeEach(() => {
        commandeAdapter = new CommandeAdapter()
    })

    describe('creerCommande quand on veut créer une commande, puis récupérerCommande quand on veut la récupérer', () => {
        it('récupère correctement la commande lorsque sa création a fonctionné', () => {
            // Given
            const commande = uneCommandeAvecDeuxPommesEtTroisPoires()

            // When
            commandeAdapter.sauvegarderCommande(commande)

            // Then
            expect(commandeAdapter.récupérerCommande(commande.id)).toEqual(commande)
        })
    })

    it('récupérerCommande lève une erreur lorsque la commande n\'existe pas', () => {
        // When
        try {
            commandeAdapter.récupérerCommande('id')
            assert.fail()
        } catch (e) {
        // Then
        expect(e).toBeInstanceOf(CommandeNonTrouvee)
        expect(e.message).toEqual('La commande avec l\'id id n\'existe pas')
        }

    })

    describe('récupérerCommande', () => {
        it('récupère la liste des commandes', () => {
            // Given
            const commande1 = uneCommandeAvecDeuxPommesEtTroisPoires()
            // @ts-ignore
            const commande2 : Commande = {
                ...commande1,
                id: 'id2'
            }
            commandeAdapter.sauvegarderCommande(commande1)
            commandeAdapter.sauvegarderCommande(commande2)

            // When
            const commandes = commandeAdapter.récupérerToutesLesCommandes()

            // Then
            expect(commandes.length).toEqual(2)
            expect(commandes[0]).toEqual(commande1)
            expect(commandes[1]).toEqual(commande2)

        })
    })


})