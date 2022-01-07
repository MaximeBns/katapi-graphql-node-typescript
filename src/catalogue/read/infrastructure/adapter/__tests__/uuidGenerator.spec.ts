import {UUIDGenerator} from "../uuidGenerator";
import { validate as uuidValidate } from 'uuid';

describe('uuidGenerator', () => {
    const uuidGenerator = new UUIDGenerator()

    it('should create a UUID v4 when generate is called', () => {
        // When
        const uuid = uuidGenerator.generate()

        // Then
        const isUUID = uuidValidate(uuid)
        expect(isUUID).toBeTruthy()

    })
})