import CommandePort from "../../domain/ports/commandePort";
import {commandePortTest} from "./helper/PortsTests";
import RecupererLesCommandes from "../recupererLesCommandes";
import {uneCommandeAvecDeuxPommesEtTroisPoires} from "../../../configuration/__tests__/utils";
import {PasDeCommande} from "../../domain/errors/PasDeCommande";
import assert from "assert";

describe('RecupererLesCommandes', () => {
    let commandePort: CommandePort
    let recupererLesCommandes: RecupererLesCommandes

    beforeEach(() => {
        commandePort = commandePortTest
        recupererLesCommandes = new RecupererLesCommandes(commandePort)
    })

    describe('exécuter: lorsqu\'on veut récupérer toutes les commandes', () => {
        it('renvoie les commandes s\'il en existe au moins une', () => {
            // Given
            const commande = uneCommandeAvecDeuxPommesEtTroisPoires()
            commandePort.récupérerToutesLesCommandes = jest.fn().mockReturnValue([commande])

            // When
            const toutesLesCommandes = recupererLesCommandes.exécuter()

            // Then
            expect(toutesLesCommandes).toEqual([commande])
        })

        it('lève une erreur s\'il n\'y a aucune commande', () => {
            // Given
            commandePort.récupérerToutesLesCommandes = jest.fn().mockReturnValue([])

            try {
                // When
                recupererLesCommandes.exécuter()
                assert.fail()
            } catch (e) {
                // Then
                expect(e).toBeInstanceOf(PasDeCommande)
                expect(e.message).toEqual('Aucune commande n\'a été trouvée')
            }
        })
    })
})