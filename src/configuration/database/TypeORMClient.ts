import {Connection} from "typeorm";

export default class TypeORMClient {
    private databaseConnection : Connection = null

    constructor(private dbConnectionPromise: Promise<Connection>) {}

    async executeQuery<T = any>(query: (db: Connection) => Promise<T>): Promise<T> {
        return query(await this.getConnection());
    }

    async closeConnection() {
        try {
            await (await this.dbConnectionPromise).close()
        } catch (erreur) {
            throw erreur
            //throw new ServiceIndisponible()
        }
    }

    private async getConnection() {
        if (!this.databaseConnection) {
            try {
                this.databaseConnection = await this.dbConnectionPromise
            } catch (erreur) {
                throw erreur
                //throw new ServiceIndisponible()
            }
        }
        return this.databaseConnection
    }
}