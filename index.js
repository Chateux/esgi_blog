const express = require('express');
const booksRouter = require('./routes/book');
const securityRouter = require('./routes/security');
const bodyParser = require('body-parser');
const cors = require('cors');

const security = require('./middleware/security');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(security.verifyToken);
app.use(securityRouter);
app.use('/books', booksRouter);


app.listen(6565, () => {
	console.log('Listening on port 6565');
});