CREATE TABLE athletes (
    id              INTEGER PRIMARY KEY,
    firstname       TEXT NOT NULL,
    lastname        TEXT NOT NULL,
    phone           Text Not NULL,
    creationDate    date,
    entries         INTEGER,

    unique(phone)

);
