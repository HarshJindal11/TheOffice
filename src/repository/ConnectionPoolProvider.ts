import pg from "pg";
import DB_CONFIG from "../DB_CONFIG.json";
const Pool = pg.Pool;

export class ConnectionPoolProvider {

    private static pool: any;

    static getConnectionPool(): any {
        if (this.pool == null) {
            this.pool = new Pool({
                user: DB_CONFIG.user,
                host: DB_CONFIG.host,
                database: DB_CONFIG.database,
                password: DB_CONFIG.password,
                port: 5432
            });
        }

        return this.pool;
    }

}