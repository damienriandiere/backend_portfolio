const swaggerAutogen = require('swagger-autogen');


const outputFile = './swagger/swagger_output.json';
const endpointsFiles = [
    './routes/authRoutes.js',
    './routes/projectRoutes.js',
    './routes/userRoutes.js',
]; 

swaggerAutogen(outputFile, endpointsFiles);
