const request = require('supertest');
const express = require('express');
const { loadMiddlewares, loadRoutes } = require('./utils/loader');

const app = express();
loadMiddlewares(app);
loadRoutes(app);

describe('API Gateway', () => {
  it('should return status', async () => {
    const res = await request(app).get('/status');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status');
  });
});
