import sqlite3

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

class AthleteDB:

    def __init__(self):
        self.connection = sqlite3.connect("athletes.db")
        self.connection.row_factory = dict_factory
        self.cursor = self.connection.cursor()

    def __del__(self):
        # disconnect!
        self.connection.close()

    def createAthlete(self, name ):
        sql = "INSERT INTO athletes (name) VALUES (?)"
        self.cursor.execute(sql, [name])
        self.connection.commit()
        return

    def getAllAthletes(self):
        self.cursor.execute("SELECT * FROM athletes ORDER BY name asc")
        return self.cursor.fetchall()

    def getAthlete(self, id):
        sql = "SELECT * FROM athletes WHERE id = ?"
        self.cursor.execute(sql, [id]) # data must be a list
        return self.cursor.fetchone()

    def deleteAthlete(self, id):
        sql = "DELETE FROM athletes WHERE id = ?"
        self.cursor.execute(sql, [id]) # data must be a list
        self.connection.commit()
        return

    def updateAthlete(self, id, name):
        sql = "UPDATE athletes SET name = ? WHERE id = ?"
        self.cursor.execute(sql, [name, id]) # data must be a list
        self.connection.commit()
        return

