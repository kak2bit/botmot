import type { D1Database, D1PreparedStatement } from "@cloudflare/workers-types";

export default class Database {

    constructor(private db: D1Database) {}

    prepare(sql: string): D1PreparedStatement {
        return this.db.prepare(sql);
    }

    async first<T = any>(sql: string, params: any[] = []) {
        return await this.db
            .prepare(sql)
            .bind(...params)
            .first<T>();
    }

    async all<T = any>(sql: string, params: any[] = []) {
        return await this.db
            .prepare(sql)
            .bind(...params)
            .all<T>();
    }

    async run(sql: string, params: any[] = []) {
        return await this.db
            .prepare(sql)
            .bind(...params)
            .run();
    }

    async raw(sql: string) {
        return await this.db.exec(sql);
    }

}