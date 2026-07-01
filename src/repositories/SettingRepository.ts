import BaseRepository from "./BaseRepository";

export default class SettingRepository extends BaseRepository {

    async get() {

        return await this.db.first(

            `

            SELECT *

            FROM settings

            LIMIT 1

            `

        );

    }

    async save(

        paymentText: string,

        paymentUrl: string

    ) {

        const exists = await this.get();

        if (exists) {

            return await this.db.run(

                `

                UPDATE settings

                SET

                    payment_text=?,

                    payment_url=?

                `,

                [

                    paymentText,

                    paymentUrl

                ]

            );

        }

        return await this.db.run(

            `

            INSERT INTO settings(

                payment_text,

                payment_url

            )

            VALUES(

                ?,?

            )

            `,

            [

                paymentText,

                paymentUrl

            ]

        );

    }

}