import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import kikleidoscopeRoutes from './routes/kikleidoscopeRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/kikleidoscope', kikleidoscopeRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello! Welcome to KIKleidoscope.',
  });
}); 

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log('KIKleidoscope is creating on port 8080'));
  } catch (error) {
    console.log(error);
  }
};

startServer();