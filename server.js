//Install express server
const express = require('express');
import sslRedirect from 'heroku-ssl-redirect';
const path = require('path');

const app = express();

// enable ssl redirect
app.use(sslRedirect());

//Serve only the static files form the dist directory
app.use(express.static('./dist/inv_geomundo'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/inv_geomundo/'}),
);

//Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);