import ProduitModel from "../../catalogue/infrastructure/adapter/models/produit.model";
import {Connection, createConnection} from "typeorm";
import * as sqlite from "expo-sqlite"

export async function createSqliteConnection(): Promise<Connection> {
	const createdConnection = await createConnection({
		type: 'expo',
		database: 'todos.db',
		driver: sqlite,
		entities: [ProduitModel],
		migrationsRun: false,
		synchronize: false,
	});
	return createdConnection
}
