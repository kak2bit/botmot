import { Buttons } from "../constants/buttons";

export default function () {

    return {

        keyboard: [

            [

                {

                    text: Buttons.FREE_CONFIG

                }

            ],

            [

                {

                    text: Buttons.SUPPORT

                }

            ],

            [

                {

                    text: Buttons.PAYMENT

                }

            ]

        ],

        resize_keyboard: true,

        one_time_keyboard: false

    };

}