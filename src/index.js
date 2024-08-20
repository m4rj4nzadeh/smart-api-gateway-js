import express from 'express';
import dotenv from 'dotenv';
import { loadMiddlewares, loadRoutes } from './utils/loader.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Load middlewares and routes
loadMiddlewares(app);
loadRoutes(app);

app.listen(PORT, () => {
  console.log(`Sample API Gateway running on port ${PORT}`);
});
