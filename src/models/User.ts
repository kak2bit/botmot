export interface User {

    id: number;

    telegram_id: number;

    username: string | null;

    first_name: string;

    last_name: string | null;

    language_code: string | null;

    is_admin: number;

    created_at: string;

    updated_at: string;

}