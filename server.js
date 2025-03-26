require("dotenv").config();

// server.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const User = require("./models/userModel");


// Import routes
const routes = [
 
  { path: "/api/users", route: require("./routes/userRoutes") },
  { path: "/api/auth", route: require("./routes/authRoutes") },
];

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Middleware
app.use(cors({origin:"*"
}));
app.use(express.json());

// Register routes
app.get('/', (req, res)=>{
  res.json({name:"rohan"});
})
routes.forEach((route) => {
  app.use(route.path, route.route);
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
