const express = require('express');
const os = require('os');
const fs = require('fs');
const geoip = require('geoip-lite');
const moment = require('moment-timezone');

const app = express();
const port = process.env.PORT || 3000;
const author = process.env.AUTHOR || 'Hubert Sikora';

const logStream = fs.createWriteStream('server.log', { flags: 'a' });
logStream.write(`Server started at ${new Date()} by ${author} on port ${port}\n`);

app.get('/', (req, res) => {
  const ip = req.ip; // Adres IP klienta
  const date = new Date(); // Data i czas na serwerze
  const geo = geoip.lookup(ip); // Informacje o lokalizacji klienta

  const clientTimezone = geo ? geo.timezone : null; // Strefa czasowa

  // Jeśli udało się zlokalizować klienta, uzyskaj datę i czas w jego strefie czasowej
  let dateInClientTimeZone = null;
  if (clientTimezone) {
    dateInClientTimezone = moment.tz(date, clientTimezone).format();
  }

  // HTML
  let html = '<!DOCTYPE html><html><head><title>Client Information</title></head><body>';
  html += `<h1>Informacje klienta</h1>`;
  html += `<p>Adres IP klienta: ${ip}</p>`;
  html += `<p>Data oraz czas: ${date}</p>`;
  if (dateInClientTimeZone) {
    html += `<p>Data oraz czas klienta (w jego strefie czasowej): ${dateInClientTimeZone}</p>`;
  } else {
    html += `<p>Nie mozna ustalic strefy czasowej</p>`;
  }
  html += '</body></html>';

  res.send(html);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
