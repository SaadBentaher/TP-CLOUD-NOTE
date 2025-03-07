const express = require('express');
const app = express();
const connectDB = require('./db');
const courseRoutes = require('./routes/course');

app.use(express.json());

connectDB();

app.use('/course', courseRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Course Service démarré sur http://localhost:${PORT}`);
});