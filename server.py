from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
import json


def readAthletes(x):
    athleteList = []
    f = open(x, "r")
    for line in f:
        line = line.strip()
        athleteList.append(line)
    f.close()
    return athleteList

def writeAthletes(listx, x):
    athleteString = ""
    f = open(x, "w")
    for ID in listx:
        athleteString += ID + "\n"
    f.write(athleteString)
    f.close()

Athletes = readAthletes("athletes.txt")

class MyRequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        if self.path == "/Athletes":
            self.send_response(200)
            # all headers go here:
            self.send_header("Content-type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            #add stuff to read the list file
            Athletes = readAthletes("athletes.txt")
            self.wfile.write(bytes(json.dumps(Athletes), "utf-8"))
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(bytes(json.dumps("not found"), "utf-8"))
        return

    def do_POST(self):
        if self.path == "/Athletes":
            length = self.headers["Content-length"]
            body = self.rfile.read(int(length)).decode("utf-8")
            print("the text body:", body)
            parsed_body = parse_qs(body)
            print("the parsed body:", parsed_body)

            Athletes.append(parsed_body["name"][0])
            writeAthletes(Athletes, "athletes.txt")

            self.send_response(201)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(bytes(json.dumps("not found"), "utf-8"))

        return

def run():
    listen = ("127.0.0.1", 8080)
    server = HTTPServer(listen, MyRequestHandler)

    print("Listening...")
    server.serve_forever()

run()
