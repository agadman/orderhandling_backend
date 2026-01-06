'use strict';

require('dotenv').config(); // Läser in miljövariabler från .env-filen
const mongoose = require('mongoose'); // Importerar mongoose för MongoDB-anslutning
const Hapi = require('@hapi/hapi'); // Importerar Hapi-ramverket för att skapa servern
const auth = require('./auth'); // Importerar auth-filen

// Startfunktion
const init = async () => {

  // Skapar Hapi-server
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    routes: {
      cors: true
    }
  });

  // Kopplar till MongoDB
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch(err => {
      console.error('Failed to connect to MongoDB', err);
    });

  // Registrerar autentisering
  await auth.register(server);

  // Importerar produkt-routes
  require('./routes/product.route')(server);
  require('./routes/user.route')(server);

  // Startar servern
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

// Fångar okända fel
process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

// Kör servern
init();