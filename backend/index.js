//main  entry point of the server
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./db/db.js";
import authRouter from "./routes/auth.js";
import customerRouter from "./routes/CustomerRoutes.js";
import measurementRouter from "./routes/measurementRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";


dotenv.config();



//accessing the content of .env file
//process.env.PORT

connectToDatabase();

const app = express();

// Enable CORS middleware (call the factory)
app.use(cors());

app.use(express.json());

// Mount auth routes at /api/auth
app.use('/api/auth', authRouter);
app.use('/api/customer', customerRouter );
app.use('/api/measurements', measurementRouter);
app.use('/api',orderRoutes);


// Simple health endpoint to verify server reachability
app.get('/ping', (req, res) => {
    res.json({ ok: true, time: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});