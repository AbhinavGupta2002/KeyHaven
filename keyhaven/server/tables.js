const accounts = 'CREATE TABLE IF NOT EXISTS accounts (id SERIAL NOT NULL PRIMARY KEY, name TEXT, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, profile_image_url TEXT, joined TIMESTAMP(0) NOT NULL, is_verified BOOLEAN NOT NULL);'

const passwords = 'CREATE TABLE IF NOT EXISTS passwords (id SERIAL NOT NULL PRIMARY KEY, title TEXT NOT NULL, page_url TEXT, emails TEXT[], password TEXT NOT NULL, updated TIMESTAMP(0) NOT NULL);'

const circles = 'CREATE TABLE IF NOT EXISTS circles (id SERIAL NOT NULL PRIMARY KEY, title TEXT NOT NULL, members TEXT[]);'

const refreshTokens = 'CREATE TABLE IF NOT EXISTS refresh_tokens (refresh_token TEXT PRIMARY KEY, expiry_date TIMESTAMP);'

const passwordSecrets = 'CREATE TABLE IF NOT EXISTS password_secrets (email TEXT PRIMARY KEY, secret_key TEXT, FOREIGN KEY (email) REFERENCES accounts(email));';

const emailVerifications = 'CREATE TABLE IF NOT EXISTS account_verif (email TEXT PRIMARY KEY, email_key TEXT, pass_key TEXT, FOREIGN KEY (email) REFERENCES accounts(email));'

module.exports = {accounts, passwords, circles, refreshTokens, passwordSecrets, emailVerifications}
