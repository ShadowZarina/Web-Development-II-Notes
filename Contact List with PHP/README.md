# Contact List (PHP + MySQL)

## Setup

1. Start Apache and MySQL (e.g. via XAMPP/MAMP).
2. Create the database by importing `db/contactlist.sql` (via phpMyAdmin or the `mysql` CLI). This creates the `contactlist` database, the `contacts` table, and a few sample rows.
3. Open `db_connect.php` and update `$host`, `$user`, and `$password` to match your local MySQL setup if they differ from the defaults (`localhost` / `root` / `root`).
4. Place this whole folder inside your server's document root (e.g. `htdocs`) and open `index.html` through the server (e.g. `http://localhost/contact-list/index.html`) — not as a `file://` path, since it needs PHP.

## Files

- `index.html`, `style.css`, `script.js` — front end (unchanged in look/feel from the original).
- `db_connect.php` — shared MySQL connection.
- `getContacts_action.php` — returns all contacts, ordered by last name.
- `addContact_action.php` — validates and inserts a new contact.
- `editContact_action.php` — validates and updates an existing contact.
- `deleteContact_action.php` — deletes a contact.
- `db/contactlist.sql` — database schema + sample data.

## Validation rules (enforced server-side, mirrored in the UI)

- Every field (last name, first name, email, contact number) is required.
- Email must be a valid email format and must not already exist in the database.
- Last name, first name, and email: max 50 characters.
- Contact number: digits only, max 15 characters.
- Contacts list is always sorted by last name (then first name).
