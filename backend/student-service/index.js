const express = require('express');
const app = express();
const connectDB = require('./db');
const studentRoutes = require('./routes/student');

app.use(express.json());

connectDB();

app.use('/student', studentRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Student Service démarré sur http://localhost:${PORT}`);
});