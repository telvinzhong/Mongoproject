To run this program, clone the repository and run:

npm install
npm start

the application should be running on http://localhost:3000 from any browser.
This assumes that mondoDB/mongoCompass is running on default localhost:27017.
Otherwise, make sure that your mongo path is added to your environment.

----------------------------------------------------------------
To import this database:

Open MongoCompass or equivalent GUI and import the following file:
mongoproject/dump/exported.json 
File type: json
Options: Ignore empty strings

This will import the primary users collection to your current database. 