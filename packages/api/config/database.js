const mongoose = require('mongoose');

class Database {
  static async connect() {
    try {
      mongoose.set('useCreateIndex', true);
      await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
      console.info('Database Connected', { time: new Date() });
    } catch (err) {
      console.error(err);
    }
  }

  static async disconnect() {
    try {
      await mongoose.connection.close();
      console.info('Database Disconnected', { time: new Date() });
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = Database;
