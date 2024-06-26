# QueryGenerator

## Voraussetzungen:

- Docker ist installiert und läuft: https://www.docker.com/products/docker-desktop/
- nodejs ist installiert: https://nodejs.org/en
- localhost Port 3000 und Port 3306 sind verfügbar

## Starten des Projekts:

- Kommandozeile im Projektordner ("QueryGenerator-main") öffnen
- folgende Befehle eingeben:

| `docker compose up -d` | startet einen Docker-Container mit MariaDB als Datenbank |
| ---------------------- | -------------------------------------------------------- |
| `npm install`          | installiert die benötigten Javascript-Pakete             |
| `npm run build`        | crosscompiliert Typescript -> Javascript                 |
| `npm run start`        |  startet Javascript-Server                               |


- Jetzt läuft ein Rest-Server und lauscht auf POST-Befehle unter http://localhost:3000/queryGenerator
- Die Datenbank ist mit ein paar Datensätzen gefüllt (siehe ./docker/init.sql) und gibt bei Eingabe des Beispiels aus dem Aufgaben-PDF ein Ergebnis zurück.
- Die Anwendung nutzt Express als Server und MariaDB als Datenbank. Eingaben werden mit AJV gegen JSON-Schematas validiert.



Mögliche Dateneingabe:

```
{
  "type": "DATE_RESTRICTION",
  "minDate": "2021",
  "maxDate": "2022",
  "column": "dateColumn",
  "child": {
    "type": "QUERY",
    "table": "table1",
    "filters": [
      {
        "type": "IN",
        "values": ["abc"],
        "column": "column3"
      },
      {
        "type": "EQUAL",
        "value": "5",
        "column": "column4"
      }
    ],
    "select": ["column1", "column2"]
  }
}
```

oder 

```
{
  "type": "QUERY",
  "table": "table1",
  "filters": [
    {
      "type": "IN",
      "values": ["abc"],
      "column": "column3"
    },
    {
      "type": "EQUAL",
      "value": "5",
      "column": "column4"
    }
  ],
  "select": ["column1", "column2"]
}
```

