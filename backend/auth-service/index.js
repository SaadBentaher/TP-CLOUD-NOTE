const express = require('express');
const app = express();
const connectDB = require('./db');
const authRoutes = require('./routes/auth');

app.use(express.json());

connectDB();

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Auth Service démarré sur http://localhost:${PORT}`);
});