const express = require('express');
const client = require('prom-client');
const db = require('./persistence');
const getItems = require('./routes/getItems');
const addItem = require('./routes/addItem');
const updateItem = require('./routes/updateItem');
const deleteItem = require('./routes/deleteItem');

const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/static'));

// REST API маршруты
app.get('/items', getItems);
app.post('/items', addItem);
app.put('/items/:id', updateItem);
app.delete('/items/:id', deleteItem);

// --- Prometheus metrics ---
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [50, 100, 200, 300, 400, 500, 1000, 2000]
});
register.registerMetric(httpRequestDurationMicroseconds);

// middleware для измерения времени ответа
app.use((req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.path, code: res.statusCode });
  });
  next();
});

// точка для Prometheus
app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// --- запуск сервера ---
db.init()
  .then(() => {
    app.listen(3000, () => console.log('Listening on port 3000'));
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// graceful shutdown
const gracefulShutdown = () => {
  db.teardown()
    .catch(() => {})
    .then(() => process.exit());
};
process.on('SIGINT', gracefulShutdow
