This is a basic boilerplate project to start creating APIs with Node.js and Express. CORS support enabled.

# ENV FILE SETTINGS

## Create a .ENV file IF YOU DONT CREATE IT IT WOULD NOT RUN 
The file has the have the follwoing

//Connecting to database

//Change this to conect to your specific database

//This will conect to a basic database

// THE DATABASE IS MONGODB


PORT=5000

// MONGODB

DATABASE=mongodb+srv://<USER>:<PASSWORD>@cluster0.mm5glq1.mongodb.net/<COLLECTION>
 
DATABASE_USER= PUT USERNAME FROM MONGODB ATLAS
 
DATABASE_PASSWORD= PUT PASSWORD FOR YOUR MONGODB ATLAS  
 
DATABASE_COLLECTION= PUT NAME FOR YOUR COLLECTION

// ENSURES THAT ONLY THIS ADDRESSES CAN MAKE REQUESTS TO THE SERVER
 
CORS_WHITELIST=http://localhost:3000/,http://localhost:5000/
 
 
##  ASK IN DISCORD FOR MONGODB CREDENTIALS PLZ

# Getting started

Install the dependencies:

```
npm i
```

and then run:

```
npm run start
```

to start the server.
