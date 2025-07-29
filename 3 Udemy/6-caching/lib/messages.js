import sql from "better-sqlite3";
import { cache } from "react";

const db = new sql("messages.db");

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY, 
      text TEXT
    )`);
}

initDb();

export function addMessage(message) {
  db.prepare("INSERT INTO messages (text) VALUES (?)").run(message);
}

export const getMessages = cache(function getMessages() {
  console.log("Fetching messages from db");
  return db.prepare("SELECT * FROM messages").all();
});
//before it was rendering 2 times on each reload as we are calling this function in 2 component so in 1 cycle it was called 2 times.
// now we are using react cache, it will cache the result of this function and will use the response in the same cycle for every call.
