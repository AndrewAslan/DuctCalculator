// Vercel serverless function entry point
import { createServer } from '../dist/index.js';

let app;

export default async function handler(req, res) {
  if (!app) {
    app = await createServer();
  }
  
  return app(req, res);
}