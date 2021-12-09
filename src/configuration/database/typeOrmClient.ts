import {Connection, createConnection} from "typeorm";

export class TypeOrmClient {
    constructor(private connection: Connection) {}
}