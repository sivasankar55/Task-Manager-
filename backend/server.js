import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';


//load env 
dotenv.config();

// connect to db
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json()); //body parser
app.use(cors({origin:'http://localhost:5173'})); // allow frontend to connect to backend

// routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT,() => console.log(`Server running on port ${PORT}`));
