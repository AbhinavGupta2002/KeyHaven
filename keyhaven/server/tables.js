const accounts = 'CREATE TABLE IF NOT EXISTS accounts (id SERIAL NOT NULL PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, salt TEXT NOT NULL, profile_image_url TEXT NOT NULL, joined TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, is_verified BOOLEAN NOT NULL);'

const passwords = 'CREATE TABLE IF NOT EXISTS passwords (id SERIAL NOT NULL PRIMARY KEY, title TEXT NOT NULL, page_url TEXT NOT NULL, emails TEXT[], password TEXT NOT NULL, salt TEXT NOT NULL, updated TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL);'

const circles = 'CREATE TABLE IF NOT EXISTS circles (id SERIAL NOT NULL PRIMARY KEY, title TEXT NOT NULL, members TEXT[]);'

module.exports = {
    accounts: accounts,
    passwords: passwords,
    circles: circles
};

