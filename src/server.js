const express = require('express');
const helmet = require('helmet');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');

mongoose
	.connect(process.env.DB_URL, {})
	.then(() => logger.info('Connected to MongoDB!'))
	.catch((err) => logger.error(err.message));

const app = express();

app.disable('x-powered-by');
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});
app.use(helmet());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/project', projectRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
	logger.info('Server listening on http://' + process.env.URL + ':' + process.env.PORT);
});

app.get('/', (req, res) => {
	logger.info('GET /');
	res.send('Hello World!');
});