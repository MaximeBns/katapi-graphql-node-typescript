import {IdGenerator} from "../../domain/ports/idGenerator";
import { v4 as uuidv4 } from 'uuid';

export class UUIDGenerator implements IdGenerator {
    constructor() {}

    generate(): string {
        return uuidv4()
    }
}