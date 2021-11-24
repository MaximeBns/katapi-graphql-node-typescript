import {IdGenerator} from "../../domain/ports/idGenerator";
import {randomUUID} from "crypto";

export class UUIDGenerator implements IdGenerator {
    constructor() {}

    generate(): string {
        return randomUUID()
    }
}