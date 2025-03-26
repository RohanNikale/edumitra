// db.js
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://dipakrathod1511:gMsvBbBzZCQ13fSE@cluster0.mxlhrov.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");

  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
