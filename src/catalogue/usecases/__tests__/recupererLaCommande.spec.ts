import CommandePort from "../../domain/ports/commandePort";
import {commandePortTest} from "./helper/PortsTests";
import {uneCommandeAvecDeuxPommesEtTroisPoires} from "../../../configuration/__tests__/utils";
import RecupererLaCommande from "../recupererLaCommande";
import {CommandeNonTrouvee} from "../../domain/errors/CommandeNonTrouvee";
import assert from "assert";

describe('recupererLaCommande', () => {
    let commandePort: CommandePort
    let recupererLaCommande : RecupererLaCommande

    beforeEach(() => {
        commandePort = commandePortTest
        recupererLaCommande = new RecupererLaCommande(commandePort)
    })

    describe('exécuter : quand on récupère la commande par id', () => {
        it('renvoie la commande lorsqu\'elle existe', async () => {
            // Given
            commandePort.récupérerCommande = jest.fn().mockReturnValue(uneCommandeAvecDeuxPommesEtTroisPoires())

            // When
            const commandeRecuperee = await recupererLaCommande.exécuter('id')

            // Then
            expect(commandeRecuperee).toEqual(uneCommandeAvecDeuxPommesEtTroisPoires())
        })

        it('lève une erreur lorsque la commande n\'existe pas', async () => {
            // Given
            commandePort.récupérerCommande = jest.fn(() => {
                throw new CommandeNonTrouvee('id')
            })

            try {
                // When
                await recupererLaCommande.exécuter('id')
                assert.fail()
            } catch (e) {
                // Then
                expect(e).toBeInstanceOf(CommandeNonTrouvee)
            }
        })
    })
})