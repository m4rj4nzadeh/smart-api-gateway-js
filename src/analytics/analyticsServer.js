import http from 'http';
import socketIo from 'socket.io';

const server = http.createServer();
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  setInterval(() => {
    socket.emit('analytics', getAnalyticsData());
  }, 1000);

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

function getAnalyticsData() {
  return {
    requestsPerMinute: Math.random() * 100,
    errorRate: Math.random() * 10
  };
}

server.listen(3001, () => {
  console.log('Analytics server running on port 3001');
});
