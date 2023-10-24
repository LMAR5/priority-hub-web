const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3001;

const app = express();

const genericRoute = require('./routes/generic');
const authRoute = require('./routes/authentication');
const categoryRoute = require('./routes/category');
const taskRoute = require('./routes/task');
const userRoute = require('./routes/user');

//Middleware to parse any request to JSON format (else, we cannot access the HTTP parameters)
//Express does not parse requests to JSON by default
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Enable CORS
app.use(cors());

app.use('/api/AuthController', authRoute);
app.use('/api/GenericController', genericRoute);
app.use('/api/CategoryController', categoryRoute);
app.use('/api/TaskController', taskRoute);
app.use('/api/UserController', userRoute);

app.listen(
    PORT,
    () => console.log(`it is alive on http://localhost:${PORT}`)
);