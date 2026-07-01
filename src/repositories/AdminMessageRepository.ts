import BaseRepository from "./BaseRepository";
import type { AdminMessage } from "../models/AdminMessage";

export default class AdminMessageRepository extends BaseRepository {

    async create(
        telegramMessageId: number,
        supportId: number
    ) {

        return await this.db.run(

            `
            INSERT INTO admin_messages(

                telegram_message_id,

                support_id,

                created_at

            )

            VALUES(

                ?,?,?

            )
            `,

            [

                telegramMessageId,

                supportId,

                new Date().toISOString()

            ]

        );

    }

    async findByTelegramMessageId(
        telegramMessageId: number
    ) {

        return await this.db.first<AdminMessage>(

            `
            SELECT *
            FROM admin_messages
            WHERE telegram_message_id=?
            `,

            [

                telegramMessageId

            ]

        );

    }

}