import BaseRepository from "./BaseRepository";
import type { Config } from "../models/Config";

export default class ConfigRepository extends BaseRepository {

    async getUserConfig(telegramId: number) {

        return await this.db.first<Config>(

            `
            SELECT *
            FROM configs
            WHERE assigned_to=?
            `,

            [telegramId]

        );

    }

    async getFreeConfig() {

        return await this.db.first<Config>(

            `
            SELECT *
            FROM configs
            WHERE status='free'
            LIMIT 1
            `

        );

    }

    async assign(

        configId: number,

        telegramId: number

    ) {

        return await this.db.run(

            `
            UPDATE configs
            SET

                status='assigned',

                assigned_to=?,

                assigned_at=?,

                updated_at=?

            WHERE id=?
            `,

            [

                telegramId,

                new Date().toISOString(),

                new Date().toISOString(),

                configId

            ]

        );

    }

    async release(

        configId: number

    ) {

        return await this.db.run(

            `
            UPDATE configs
            SET

                status='free',

                assigned_to=NULL,

                assigned_at=NULL,

                updated_at=?

            WHERE id=?
            `,

            [

                new Date().toISOString(),

                configId

            ]

        );

    }

    async add(config: string) {

        const now = new Date().toISOString();

        return await this.db.run(

            `

        INSERT INTO configs(

            config,

            status,

            created_at,

            updated_at

        )

        VALUES(

            ?,

            'free',

            ?,

            ?

        )

        `,

            [

                config,

                now,

                now

            ]

        );

    }

    async count() {

        return await this.db.first(

            `

        SELECT

            COUNT(*) as total,

            SUM(status='free') as free,

            SUM(status='assigned') as assigned

        FROM configs

        `

        );

    }
    async list() {

        return await this.db.all(

            `
        SELECT
            c.*,
            u.first_name,
            u.username
        FROM configs c
        LEFT JOIN users u
            ON u.telegram_id = c.assigned_to
        ORDER BY c.id DESC
        `

        );

    }

    async delete(id: number) {

        return await this.db.run(

            `
        DELETE FROM configs
        WHERE id=?
        `,

            [id]

        );

    }

    async find(id: number) {

        return await this.db.first(

            `
        SELECT *
        FROM configs
        WHERE id=?
        `,

            [id]

        );

    }
}