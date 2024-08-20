# Smart API Gateway

**Smart API Gateway** is a robust API Gateway for Node.js, offering essential middleware functionalities and advanced features like AI-powered request routing and real-time analytics.

## Installation

Install the package via npm:

```bash
npm install smart-api-gateway-js
```

## Basic Setup

1. **Create an Express Application**

   Set up a new Express application and integrate the Smart API Gateway:

   ```javascript
   import express from 'express';
   import dotenv from 'dotenv';
   import { loadMiddlewares, loadRoutes } from 'smart-api-gateway-js/src/utils/loader.js';
   import { aiRoutingMiddleware } from 'smart-api-gateway-js/src/middlewares/aiRoutingMiddleware.js'; 

   dotenv.config();

   const app = express();
   const PORT = process.env.PORT || 4000;

   app.use(express.json());

   // Load AI routing middleware if enabled
   if (process.env.ENABLE_AI_ROUTING === 'true') {
     app.use(aiRoutingMiddleware);
   }

   // Load other middlewares and routes
   loadMiddlewares(app);
   loadRoutes(app);

   app.listen(PORT, () => {
     console.log(`API Gateway running on port ${PORT}`);
   });
   ```

2. **Configure Environment Variables**

   Create a `.env` file in your project root with the following configuration:

   ```plaintext
   PORT=4000
   ENABLE_SECURITY_MIDDLEWARE=true
   ENABLE_RATE_LIMIT_MIDDLEWARE=true
   ENABLE_CORS_MIDDLEWARE=true
   ENABLE_LOGGING_MIDDLEWARE=true
   ENABLE_AI_ROUTING=true
   ENABLE_ANALYTICS=true
   ENCRYPTION_KEY=your_encryption_key_here
   ```

## Features

### AI-Powered Request Routing

The AI-powered request routing middleware dynamically routes requests based on predictions from an AI model.

1. **Add Your AI Model**

   Place your AI model file (e.g., `model.json`) in an accessible directory.

2. **Set Up AI Middleware**

   Ensure your AI middleware is configured correctly to use your AI model.

   **`middlewares/aiRoutingMiddleware.js`**

   ```javascript
   import * as tf from '@tensorflow/tfjs';

   let model;
   async function loadModel() {
     model = await tf.loadLayersModel('file://path/to/your/model.json');
   }
   loadModel();

   export async function aiRoutingMiddleware(req, res, next) {
     try {
       const features = [req.headers['user-agent'].length, req.body.length];
       const prediction = model.predict(tf.tensor([features])).dataSync();
       req.route = prediction > 0.5 ? '/route1' : '/route2'; // Customize routing logic as needed
       next();
     } catch (error) {
       next(error);
     }
   }
   ```

### Real-Time Analytics Dashboard

Monitor your API's performance with a real-time analytics dashboard.

1. **Set Up Analytics Server**

   **`analytics/analyticsServer.js`**

   ```javascript
   import http from 'http';
   import socketIo from 'socket.io';

   const server = http.createServer();
   const io = socketIo(server);

   io.on('connection', (socket) => {
     console.log('A user connected');
     setInterval(() => {
       socket.emit('analytics', { requestsPerMinute: Math.random() * 100, errorRate: Math.random() * 10 });
     }, 1000);

     socket.on('disconnect', () => {
       console.log('User disconnected');
     });
   });

   server.listen(3001, () => {
     console.log('Analytics server running on port 3001');
   });
   ```

2. **Create Analytics Dashboard**

   **`public/dashboard.html`**

   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <title>Real-Time Analytics Dashboard</title>
     <script src="/socket.io/socket.io.js"></script>
     <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
   </head>
   <body>
     <h1>API Analytics Dashboard</h1>
     <canvas id="chart" width="400" height="200"></canvas>

     <script>
       const socket = io('http://localhost:3001');
       const ctx = document.getElementById('chart').getContext('2d');

       const chart = new Chart(ctx, {
         type: 'line',
         data: {
           labels: [],
           datasets: [{
             label: 'Requests Per Minute',
             data: [],
             borderColor: 'rgba(75, 192, 192, 1)',
             borderWidth: 1,
             fill: false
           }]
         },
         options: {
           scales: {
             x: { type: 'time', time: { unit: 'minute' } },
             y: { beginAtZero: true }
           }
         }
       });

       socket.on('analytics', (data) => {
         const now = new Date();
         chart.data.labels.push(now);
         chart.data.datasets[0].data.push(data.requestsPerMinute);
         chart.update();
       });
     </script>
   </body>
   </html>
   ```

3. **Serve Dashboard**

   Ensure your Express server serves the static files:

   **`server.js`**

   ```javascript
   import express from 'express';
   import path from 'path';
   import { loadMiddlewares, loadRoutes } from './utils/loader.js';

   const app = express();
   const PORT = process.env.PORT || 4000;

   app.use(express.json());
   app.use(express.static(path.join(__dirname, 'public')));

   loadMiddlewares(app);
   loadRoutes(app);

   app.listen(PORT, () => {
     console.log(`API Gateway running on port ${PORT}`);
   });
   ```

   Access the dashboard at:

   ```
   http://localhost:4000/dashboard.html
   ```

## License

MIT License.
