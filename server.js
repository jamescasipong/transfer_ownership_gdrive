// server.js
import app from './app.js';
import appConfig from './src/config/appConfig.js';

const PORT = appConfig.port;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${appConfig.environment}`);
  console.log(`Visit: http://localhost:${PORT}`);
});