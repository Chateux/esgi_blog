const express = require('express');
const booksRouter = require('./routes/book');
const bodyParser = require('body-parser');
const securityRouter = require('./routes/security');
const security = require('./middleware/security');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(security.verifyToken);
app.use(securityRouter);
app.use('/books', booksRouter);


app.listen(6565, () => {
	console.log('Listening on port 6565');
});