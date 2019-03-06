from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
import json
from athletes import AthleteDB

class MyRequestHandler(BaseHTTPRequestHandler):

    def handleAthletesList(self):
        self.send_response(200)
        # all headers go here:
        self.send_header("Content-type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()

        db = AthleteDB()
        athletes = db.getAllAthletes()
        self.wfile.write(bytes(json.dumps(athletes), "utf-8"))

    def handleAthletesCreate(self):
        length = self.headers["Content-length"]
        body = self.rfile.read(int(length)).decode("utf-8")
        print("the text body:", body)
        parsed_body = parse_qs(body)
        print("the parsed body:", parsed_body)

        # save the athlete!
        name = parsed_body["name"][0]
        # send these values to the DB!
        db = AthleteDB()
        db.createAthlete(name)

        self.send_response(201)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()

    def handleAthletesRetrieve(self, id):
        db = AthleteDB()
        athlete = db.getAthletes(id)

        if athlete == None:
            self.handleNotFound()
        else:
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(bytes(json.dumps(Athlete), "utf-8"))

    def handleAthletesDelete(self, id):
        db = AthleteDB()
        db.createAthlete(id)

        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()


    def handleNotFound(self):
        self.send_response(404)
        self.send_header("Content-type", "text/plain")
        self.end_headers()
        self.wfile.write(bytes("Not found", "utf-8"))

    def do_GET(self):
        # parse the path to find the collection and identifier
        parts = self.path.split('/')[1:]
        collection = parts[0]
        if len(parts) > 1:
            id = parts[1]
        else:
            id = None

        if collection == "Athletes":
            if id == None:
                self.handleAthletesList()
            else:
                self.handleAthletesRetrieve(id)
        else:
            self.handleNotFound()


    def do_POST(self):
        if self.path == "/Athletes":
            self.handleAthletesCreate()
        else:
            self.handleNotFound()


    def do_DELETE(self):
        if self.path == "/Athletes":
        # parse the path to find the collection and identifier
            parts = self.path.split('/')[1:]
            if len(parts) > 2:
                id = parts[2]
                self.handleAthletesDelete(id)
            else:
                self.handleNotFound()
        else:
            self.handleNotFound()



def run():
    listen = ("127.0.0.1", 8080)
    server = HTTPServer(listen, MyRequestHandler)

    print("Listening...")
    server.serve_forever()

run()
