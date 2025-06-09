import express from 'express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Simple health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'HVAC Calculator API is running' });
});

// Since this is a client-side calculator, we don't need complex backend routes
// All calculations are handled in the frontend

export default app;