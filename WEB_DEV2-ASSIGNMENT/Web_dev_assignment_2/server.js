const express = require('express');
const logger = require('./middleware/logger');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Body-parsing Middleware
app.use(express.json());

// Custom Logger Middleware
app.use(logger);

// Modular Routes
app.use('/students', studentRoutes);

// Global 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Error-Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});