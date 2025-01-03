const mongoose = require('mongoose');

const uri = "mongodb+srv://romerojimena700:45404939@cluster0.v1gd4.mongodb.net/bbdd_mern_blog";

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexión exitosa a MongoDB");
  } catch (err) {
    console.error("Error al conectar a MongoDB:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
