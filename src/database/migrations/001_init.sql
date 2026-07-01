CREATE TABLE users (
                       id INTEGER PRIMARY KEY AUTOINCREMENT,
                       telegram_id INTEGER UNIQUE NOT NULL,
                       username TEXT,
                       first_name TEXT,
                       last_name TEXT,
                       language_code TEXT,
                       is_admin INTEGER DEFAULT 0,
                       created_at TEXT NOT NULL,
                       updated_at TEXT NOT NULL
);

CREATE TABLE configs (
                         id INTEGER PRIMARY KEY AUTOINCREMENT,
                         config TEXT NOT NULL,
                         status TEXT NOT NULL DEFAULT 'free',
                         assigned_to INTEGER,
                         assigned_at TEXT,
                         created_at TEXT NOT NULL,
                         updated_at TEXT NOT NULL
);

CREATE TABLE supports (
                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                          telegram_id INTEGER NOT NULL,
                          status TEXT NOT NULL DEFAULT 'open',
                          admin_id INTEGER,
                          created_at TEXT NOT NULL,
                          updated_at TEXT NOT NULL
);

CREATE TABLE support_messages (
                                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                                  support_id INTEGER NOT NULL,
                                  sender INTEGER NOT NULL,
                                  message TEXT NOT NULL,
                                  is_admin INTEGER DEFAULT 0,
                                  created_at TEXT NOT NULL
);

CREATE TABLE settings (
                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                          payment_text TEXT,
                          payment_url TEXT
);

CREATE TABLE user_states (
                             telegram_id INTEGER PRIMARY KEY,
                             state TEXT NOT NULL,
                             data TEXT
);

CREATE TABLE admin_messages (

                                id INTEGER PRIMARY KEY AUTOINCREMENT,

                                telegram_message_id INTEGER NOT NULL,

                                support_id INTEGER NOT NULL,

                                created_at TEXT NOT NULL

);


CREATE INDEX idx_configs_status
    ON configs(status);

CREATE INDEX idx_configs_assigned_to
    ON configs(assigned_to);

CREATE INDEX idx_supports_telegram
    ON supports(telegram_id);

CREATE INDEX idx_support_messages_support
    ON support_messages(support_id);

CREATE INDEX idx_admin_messages
    ON admin_messages(telegram_message_id);