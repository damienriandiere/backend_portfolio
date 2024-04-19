const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const swaggerRoutes = require('./routes/swaggerRoutes');
const cors = require('cors');

mongoose
	.connect(process.env.DB_URL, {})
	.then(() => console.info('Connected to MongoDB!'))
	.catch((err) => console.error(err.message));

const app = express();

app.disable('x-powered-by');

//For cors problem
app.use(cors());
app.options('*', cors());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use(helmet());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/projects', projectRoutes);
swaggerRoutes(app);

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.info('Server listening on http://' + process.env.URL + ':' + process.env.PORT);
});

app.get('/', (req, res) => {
	console.info('GET /');
	res.send('Hello World!');
});