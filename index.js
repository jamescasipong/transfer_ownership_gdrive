// index.js
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import driveRoutes from './routes/driveRoutes.js';

const app = express();
const PORT = 3000;

// Use routes
app.use(authRoutes);
app.use(driveRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
