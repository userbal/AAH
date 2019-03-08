### Resource: 
Athletes

### Attributes: 
ID, Firstname, Lastname, Phone, Creation Date, Entries

```sql
CREATE TABLE athletes (
    id              INTEGER PRIMARY KEY,
    firstname       TEXT NOT NULL,
    lastname        TEXT NOT NULL,
    phone           Text Not NULL,
    creationDate    Text Not NULL,
    entries         INTEGER
);
```

### RESTful Endpoints:
List|Retrieve|Create|Replace|Delete
----|--------|------|-------|------
Returns all athlete records using GET at the path: http://localhost:8080/Athletes | Returns one athlete record  using GET at the path http://localhost:8080/Athletes/id | Creates an athlete using POST the path http://localhost:8080/Athletes | Updates a record using PUT at the path http://localhost:8080/Athletes/id|Deletes an athlete record using DELETE at the path http://localhost:8080/Athletes/id
