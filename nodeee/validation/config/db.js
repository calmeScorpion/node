const mongoose = require('mongoose');
const { connect, connection } = mongoose;
require('dotenv').config();
mongoose.set('strictQuery', false);
// mongoose.set('debug', true);

connect(process.env.DB_URL);

connection.on('connected', () => console.log('DB connected'));
connection.on('error', (err) => console.log('error', err));

module.exports = connection;
