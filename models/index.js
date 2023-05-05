const mongoose = require('mongoose');
const env = process.env.NODE_ENV ?? 'development';
const { host, port, dbName } = require('./../config/mongoDBConfigs')[env];

mongoose
  .connect(`mongodb://${host}:${port}/${dbName}`, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // serverSelectionTimeoutMS: 5000,
    // autoIndex: false, // Don't build indexes
    // maxPoolSize: 10, // Maintain up to 10 socket connections
    // serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  })
  .then(() => console.log('Connection OK'))
  .catch(err => console.log('err :>> ', err));

module.exports.User = require('./user');
module.exports.Post = require('./post');
module.exports.Phone = require('./phone');
