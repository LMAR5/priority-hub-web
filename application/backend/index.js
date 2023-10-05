const express = require('express');
const cors = require('cors');
const PORT = 3001;

const app = express();

const genericRoute = require('./routes/generic');
const categoryRoute = require('./routes/category');
const taskRoute = require('./routes/task');

//Middleware to parse any request to JSON format (else, we cannot access the HTTP parameters)
//Express does not parse requests to JSON by default
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Enable CORS
app.use(cors());

app.use('/GenericController', genericRoute);
app.use('/CategoryController', categoryRoute);
app.use('/TaskController', taskRoute);

app.listen(
    PORT,
    () => console.log(`it is alive on http://localhost:${PORT}`)
);