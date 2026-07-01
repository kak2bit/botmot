import BaseRepository from "./BaseRepository";
import type { User } from "../models/User";

export default class UserRepository extends BaseRepository {

    async findByTelegramId(telegramId: number) {

        return await this.db.first<User>(

            `
            SELECT *
            FROM users
            WHERE telegram_id = ?
            `,

            [telegramId]

        );

    }

    async create(user: any) {

        const now = new Date().toISOString();

        return await this.db.run(

            `
            INSERT INTO users(

                telegram_id,
                username,
                first_name,
                last_name,
                language_code,
                is_admin,
                created_at,
                updated_at

            )

            VALUES(

                ?,?,?,?,?,?,?,?

            )
            `,

            [

                user.id,

                user.username ?? null,

                user.first_name ?? "",

                user.last_name ?? null,

                user.language_code ?? null,

                0,

                now,

                now

            ]

        );

    }

    async updateAdmin(
        telegramId: number,
        isAdmin: number
    ) {

        return await this.db.run(

            `
            UPDATE users
            SET is_admin=?
            WHERE telegram_id=?
            `,

            [

                isAdmin,

                telegramId

            ]

        );

    }

    async count() {

        return await this.db.first(

            `

        SELECT COUNT(*) as total

        FROM users

        `

        );

    }
}