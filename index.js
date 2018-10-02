const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const morgan = require('morgan');
const home = require('./routes/home');
const courses = require('./routes/courses');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(logger);
app.use(morgan('short'));
app.use('/', home);
app.use('/api/courses', courses);

var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Logging in port ${port}..`));
