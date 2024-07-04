import express from 'express';
import dotenv from 'dotenv'
import http from 'http';
import cors from 'cors';

// Data
import { urlList } from './utils/urlList';
import { apiAuthMiddleware } from './middleware/apiAuth';
import { connectDB } from './database/database';

// Routes 
const index = require('./routes/index');
const admin = require('./routes/admin');
const food = require('./routes/food');
const branches = require("./routes/branches");
const contact = require('./routes/contact');
const subscription = require('./routes/subscription');

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: urlList,
  optionsSuccessStatus: 200,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// app.use(apiAuthMiddleware);

connectDB();

// Routes
app.use('/', index);
app.use('/admin', admin);
app.use('/food', food);
app.use("/branches", branches);
app.use("/contact", contact);
app.use('/subscription', subscription);

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});