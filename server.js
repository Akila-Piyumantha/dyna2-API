require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/auth');

const app = express();

// Use CORS middleware
app.use(cors({
  origin: 'https://airdyna-client2-git-master-akila-piyumanthas-projects.vercel.app/', // or your frontend URL
  methods: ["GET", "POST", "DELETE", "PATCH"],
  credentials: true,
}));

// Middleware to parse JSON
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to the DB');
    // Start the server only after DB connection is successful
    app.listen(process.env.PORT, () => {
      console.log('Listening on port', process.env.PORT);
    });
  })
  .catch(error => {
    console.log(error);
  });

