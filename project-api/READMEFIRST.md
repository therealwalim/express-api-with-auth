# AOOP Project

This project was made by **Walim Echaib** for the *Advanced Oriented Object Programming* 

Run the following command to start the server :
```npm start```

A small report is available as ```backend-doc.pdf``` in order to explain some technical aspects of the project, please read it before, there are instructions that have to be understood in order to run the app.

### Database
Database is hosted on cloud thanks to Azure Cosmos DB, it's using MongoDB and the app can run all the requests thanks to the API key available on the ```dev.env```file.

### In case of any problem during the first start
Delete ```./node_modules/``` folder and ```yarn.lock```, and run an ```npm install``` to reinstall the dependencies.