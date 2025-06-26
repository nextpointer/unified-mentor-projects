import { Database } from 'bun:sqlite';

const db = new Database('users.db');

function init() {
    // Create a table for users if it doesn't exist
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
    `);

    // Create a table for user documents if it doesn't exist
    db.run(`
        CREATE TABLE IF NOT EXISTS user_documents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            title TEXT,
            file_path TEXT
        )
  `);
}

init();

export default db;
