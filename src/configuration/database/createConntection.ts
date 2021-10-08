import ProduitModel from "../../catalogue/infrastructure/adapter/models/produit.model";
import {Connection, createConnection} from "typeorm";

export async function createSqliteConnection(): Promise<Connection> {
	const createdConnection = await createConnection({
		type: 'expo',
		database: 'todos.db',
		driver: require('expo-sqlite'),
		entities: [ProduitModel],
		migrationsRun: false,
		synchronize: false,
	});
	return createdConnection
}
